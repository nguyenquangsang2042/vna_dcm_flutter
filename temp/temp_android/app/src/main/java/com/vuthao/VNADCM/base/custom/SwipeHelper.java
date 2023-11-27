package com.vuthao.VNADCM.base.custom;


import android.content.Context;
import android.graphics.*;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.text.Layout;
import android.text.StaticLayout;
import android.text.TextPaint;
import android.view.GestureDetector;
import android.view.MotionEvent;
import android.view.View;
import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;
import androidx.recyclerview.widget.ItemTouchHelper;
import androidx.recyclerview.widget.RecyclerView;

import java.util.*;

public abstract class SwipeHelper extends ItemTouchHelper.SimpleCallback {

    public static final int BUTTON_WIDTH = 200;
    private RecyclerView recyclerView;
    private List<UnderlayButton> buttons;
    private GestureDetector gestureDetector;
    private int swipedPos = -1;
    private float swipeThreshold = 0.5f;
    private Map<Integer, List<UnderlayButton>> buttonsBuffer;
    private Queue<Integer> recoverQueue;
    private static Boolean animate;
    private Context context;

    private GestureDetector.SimpleOnGestureListener gestureListener = new GestureDetector.SimpleOnGestureListener() {
        @Override
        public boolean onSingleTapConfirmed(MotionEvent e) {
            for (UnderlayButton button : buttons) {
                if (button.onClick(e.getX(), e.getY()))
                    break;
            }

            return true;
        }
    };

    private View.OnTouchListener onTouchListener = new View.OnTouchListener() {
        @Override
        public boolean onTouch(View view, MotionEvent e) {
            if (swipedPos < 0) return false;
            Point point = new Point((int) e.getRawX(), (int) e.getRawY());

            RecyclerView.ViewHolder swipedViewHolder = recyclerView.findViewHolderForAdapterPosition(swipedPos);
            View swipedItem = swipedViewHolder.itemView;
            Rect rect = new Rect();
            swipedItem.getGlobalVisibleRect(rect);

            if (e.getAction() == MotionEvent.ACTION_DOWN || e.getAction() == MotionEvent.ACTION_UP || e.getAction() == MotionEvent.ACTION_MOVE) {
                if (rect.top < point.y && rect.bottom > point.y)
                    gestureDetector.onTouchEvent(e);
                else {
                    recoverQueue.add(swipedPos);
                    swipedPos = -1;
                    recoverSwipedItem();
                }
            }
            return false;
        }
    };

    public SwipeHelper(Context context, RecyclerView recyclerView, Boolean animate) {
        super(0, ItemTouchHelper.LEFT);
        this.animate = animate;
        this.recyclerView = recyclerView;
        this.buttons = new ArrayList<>();
        this.gestureDetector = new GestureDetector(context, gestureListener);
        this.recyclerView.setOnTouchListener(onTouchListener);
        buttonsBuffer = new HashMap<>();
        recoverQueue = new LinkedList<Integer>() {
            @Override
            public boolean add(Integer o) {
                if (contains(o))
                    return false;
                else
                    return super.add(o);
            }
        };

        attachSwipe();
    }


    @Override
    public boolean onMove(RecyclerView recyclerView, RecyclerView.ViewHolder viewHolder, RecyclerView.ViewHolder target) {
        return false;
    }

    @Override
    public void onSwiped(RecyclerView.ViewHolder viewHolder, int direction) {
        int pos = viewHolder.getAdapterPosition();

        if (swipedPos != pos)
            recoverQueue.add(swipedPos);

        swipedPos = pos;

        if (buttonsBuffer.containsKey(swipedPos))
            buttons = buttonsBuffer.get(swipedPos);
        else
            buttons.clear();

        buttonsBuffer.clear();
        swipeThreshold = 0.5f * buttons.size() * BUTTON_WIDTH;
        recoverSwipedItem();
    }

    @Override
    public float getSwipeThreshold(RecyclerView.ViewHolder viewHolder) {
        return swipeThreshold;
    }

    @Override
    public float getSwipeEscapeVelocity(float defaultValue) {
        return 0.1f * defaultValue;
    }

    @Override
    public float getSwipeVelocityThreshold(float defaultValue) {
        return 5.0f * defaultValue;
    }

    @Override
    public void onChildDraw(Canvas c, RecyclerView recyclerView, RecyclerView.ViewHolder viewHolder, float dX, float dY, int actionState, boolean isCurrentlyActive) {
        int pos = viewHolder.getAdapterPosition();
        float translationX = dX;
        View itemView = viewHolder.itemView;

        if (pos < 0) {
            swipedPos = pos;
            return;
        }

        if (actionState == ItemTouchHelper.ACTION_STATE_SWIPE) {
            if (dX < 0) {
                List<UnderlayButton> buffer = new ArrayList<>();

                if (!buttonsBuffer.containsKey(pos)) {
                    instantiateUnderlayButton(viewHolder, buffer);
                    buttonsBuffer.put(pos, buffer);
                } else {
                    buffer = buttonsBuffer.get(pos);
                }

                translationX = dX * buffer.size() * BUTTON_WIDTH / itemView.getWidth();
                drawButtons(c, itemView, buffer, pos, translationX);
            }
        }

        super.onChildDraw(c, recyclerView, viewHolder, translationX, dY, actionState, isCurrentlyActive);
    }

    private synchronized void recoverSwipedItem() {
        while (!recoverQueue.isEmpty()) {
            int pos = recoverQueue.poll();
            if (pos > -1) {
                recyclerView.getAdapter().notifyItemChanged(pos);
            }
        }
    }

    private void drawButtons(Canvas c, View itemView, List<UnderlayButton> buffer, int pos, float dX) {
        float right = itemView.getRight();
        float dButtonWidth = (-1) * dX / buffer.size();

        for (UnderlayButton button : buffer) {
            float left = right - dButtonWidth;
            button.onDraw(
                    c,
                    new RectF(
                            left,
                            itemView.getTop(),
                            right,
                            itemView.getBottom()
                    ),
                    pos
            );

            right = left;
        }
    }

    public void attachSwipe() {
        ItemTouchHelper itemTouchHelper = new ItemTouchHelper(this);
        itemTouchHelper.attachToRecyclerView(recyclerView);
    }

    public abstract void instantiateUnderlayButton(RecyclerView.ViewHolder viewHolder, List<UnderlayButton> underlayButtons);

    public static class UnderlayButton {
        private String text;
        private Drawable imageResId;
        private int buttonBackgroundcolor;
        private int textColor;
        private int pos;
        private RectF clickRegion;
        private UnderlayButtonClickListener clickListener;
        private Context context;

        public UnderlayButton(Context context,String text, Drawable imageResId, int buttonBackgroundcolor, int textColor, UnderlayButtonClickListener clickListener) {
            this.text = text;
            this.imageResId = imageResId;
            this.buttonBackgroundcolor = buttonBackgroundcolor;
            this.textColor = textColor;
            this.clickListener = clickListener;
            this.context=context;
        }

        public boolean onClick(float x, float y) {
            if (clickRegion != null && clickRegion.contains(x, y)) {
                clickListener.onClick(pos);
                return true;
            }

            return false;
        }

        private void onDraw(Canvas canvas, RectF rect, int pos) {

            Paint p = new Paint();
            // Draw background
            p.setColor(buttonBackgroundcolor);
            canvas.drawRect(rect, p);

            if (!animate) {
                // Draw Text
                p.setColor(textColor);
                p.setTextSize(40);
                Rect r = new Rect();
                float cHeight = rect.height();
                float cWidth = rect.width();
                p.setTextAlign(Paint.Align.CENTER); // Center the text horizontally

                // Measure the text bounds
                p.getTextBounds(text, 0, text.length(), r);
                float x = rect.centerX() - r.width() / 2f;
                float y = rect.centerY() - r.height() / 2f;

                canvas.drawText(text, x, y, p);

                if (imageResId != null) {
                    // Calculate the new size for the image
                    float imageSize = 20 * context.getResources().getDisplayMetrics().density; // 20dp converted to pixels
                    float aspectRatio = (float) imageResId.getIntrinsicWidth() / (float) imageResId.getIntrinsicHeight();
                    float imgWidth = imageSize;
                    float imgHeight = imageSize / aspectRatio;

                    // Calculate the bounds for the centered image
                    float imgLeft = rect.centerX() - imgWidth / 2f;
                    float imgTop = rect.centerY() - imgHeight / 2f;
                    float imgRight = imgLeft + imgWidth;
                    float imgBottom = imgTop + imgHeight;

                    imageResId.setBounds((int) imgLeft, (int) imgTop, (int) imgRight, (int) imgBottom);
                    imageResId.draw(canvas);
                }
            }  else {
                //animate
                // Draw Text
                TextPaint textPaint = new TextPaint();
                textPaint.setTextSize(40);
                textPaint.setColor(textColor);
                StaticLayout sl = new StaticLayout(text, textPaint, (int) rect.width(),
                        Layout.Alignment.ALIGN_CENTER, 1, 1, false);

                if (imageResId != null) {
                    imageResId.setBounds((int) (rect.left + 50), (int) (rect.top + (rect.height() / 2f)), (int) (rect.right - 50), (int) (rect.bottom - ((rect.height() / 10f))));
                    imageResId.draw(canvas);
                }

                canvas.save();
                Rect r = new Rect();
                float y = (rect.height() / 2f) + (r.height() / 2f) - r.bottom - (sl.getHeight() / 2);

                if (imageResId == null)
                    canvas.translate(rect.left, rect.top + y);
                else
                    canvas.translate(rect.left, rect.top + y - 30);


                sl.draw(canvas);
                canvas.restore();
            }

            clickRegion = rect;
            this.pos = pos;
        }

    }

    public interface UnderlayButtonClickListener {
        void onClick(int pos);
    }
}

