package com.vuthao.VNADCM.offline;

import android.annotation.SuppressLint;
import android.content.Context;
import android.util.DisplayMetrics;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;
import androidx.recyclerview.widget.RecyclerView;
import com.vuthao.VNADCM.R;

import java.util.List;

public class TypeSearchAdapter extends RecyclerView.Adapter<TypeSearchAdapter.ViewHolder> {

    private List<String> itemList;
    public int selectedItem = 0;
    private Context context;
    private ChangeTypeSearch listener;
    public interface ChangeTypeSearch{
        void onChangeType(int position);
    }

    public TypeSearchAdapter(ChangeTypeSearch listener,Context context,List<String> itemList) {
        this.itemList = itemList;
        this.context=context;
        this.listener=listener;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        Context context = parent.getContext();
        View itemView = LayoutInflater.from(context).inflate(R.layout.item_type_search, parent, false);
        // Calculate the desired width based on one-third of the screen width
        DisplayMetrics displayMetrics = context.getResources().getDisplayMetrics();
        int screenWidth = displayMetrics.widthPixels-40;
        int itemWidth = screenWidth / 3; // One-third of the screen width

        // Set the calculated width to the item view
        ViewGroup.LayoutParams layoutParams = itemView.getLayoutParams();
        layoutParams.width = itemWidth;
        itemView.setLayoutParams(layoutParams);
        return new ViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, @SuppressLint("RecyclerView") int position) {
        String item = itemList.get(position);
        holder.textView.setText(item);
        holder.textView.setMaxLines(1);
        holder.textView.setEllipsize(android.text.TextUtils.TruncateAt.END);

        holder.itemView.setOnClickListener(v -> {
            int previousSelected = selectedItem;
            selectedItem = position;
            notifyItemChanged(previousSelected);
            notifyItemChanged(selectedItem);
            listener.onChangeType(position);
        });

        if (selectedItem == position) {
            holder.textView.setTextColor(ContextCompat.getColor(context,R.color.white));
            holder.textView.setBackground(ContextCompat.getDrawable(context, R.drawable.background_rounded_type_search));
        } else {
            holder.textView.setTextColor(ContextCompat.getColor(context,R.color.black));
            holder.textView.setBackgroundColor(ContextCompat.getColor(context,R.color.white));
        }
    }

    @Override
    public int getItemCount() {
        return itemList.size();
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView textView;

        ViewHolder(View itemView) {
            super(itemView);
            textView = itemView.findViewById(R.id.textItem);
        }
    }
}
