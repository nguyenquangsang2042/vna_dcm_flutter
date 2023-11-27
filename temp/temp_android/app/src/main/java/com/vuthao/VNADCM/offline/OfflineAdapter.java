package com.vuthao.VNADCM.offline;

import android.content.Context;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.graphics.drawable.Drawable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;
import androidx.recyclerview.widget.ItemTouchHelper;
import androidx.recyclerview.widget.RecyclerView;
import com.vuthao.VNADCM.R;
import com.vuthao.VNADCM.base.Constants;
import com.vuthao.VNADCM.base.Functions;
import com.vuthao.VNADCM.base.ImageLoader;
import com.vuthao.VNADCM.base.model.app.DocumentOffline;
import com.vuthao.VNADCM.databinding.ItemCommentBinding;
import com.vuthao.VNADCM.databinding.ItemLoadingBinding;

import java.util.ArrayList;
import java.util.List;

public class OfflineAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {
    private Context context;
    private List<DocumentOffline> offlines;
    private List<DocumentOffline> originalOfflines; // Store the original unfiltered data
    private OfflineListener listener;
    private final int TYPE_ITEM = 0;
    private final int TYPE_LOADING = 1;

    public interface OfflineListener {
        void onItemClick(int pos);
    }

    public OfflineAdapter(Context context, List<DocumentOffline> offlines, OfflineListener listener) {
        this.context = context;
        this.offlines = offlines;
        this.originalOfflines = new ArrayList<>(offlines); // Create a copy of the original data
        this.listener = listener;
    }

    public void setData(List<DocumentOffline> offlines) {
        List<DocumentOffline> newData=new ArrayList<>();
        if(offlines!=null && !offlines.isEmpty())
        {
            newData.addAll(offlines);
        }
        if(!newData.isEmpty())
        {
            if (this.offlines != null) {
                this.offlines.clear();
                this.offlines.addAll(newData);
            } else
                this.offlines = newData;
            if (this.originalOfflines != null) {
                this.originalOfflines.clear();
                this.originalOfflines.addAll(newData);
            } else
                this.originalOfflines = new ArrayList<>(newData); // Create a copy of the original data
            this.notifyDataSetChanged();
        }
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        if (viewType == TYPE_ITEM) {
            ItemCommentBinding binding = ItemCommentBinding.inflate(LayoutInflater.from(parent.getContext()), parent, false);
            return new OfflineHolder(binding);
        } else {
            ItemLoadingBinding binding = ItemLoadingBinding.inflate(LayoutInflater.from(parent.getContext()), parent, false);
            return new OfflineLoadingHolder(binding);
        }
    }

    @Override
    public void onBindViewHolder(@NonNull RecyclerView.ViewHolder holder, int position) {
        if (holder instanceof OfflineLoadingHolder) {
            // Handle loading view holder
        } else {
            populateRows((OfflineHolder) holder, position);
        }
    }

    private void populateRows(OfflineHolder holder, int position) {
        DocumentOffline offline = offlines.get(position);

        if (position % 2 == 0) {
            holder.binding.getRoot().setBackgroundColor(ContextCompat.getColor(context, R.color.clBlue2));
        } else {
            holder.binding.getRoot().setBackgroundColor(ContextCompat.getColor(context, R.color.white));
        }

        if (offline != null) {
            if (!Functions.isNullOrEmpty(offline.getThumbnail())) {
                ImageLoader.getInstance().loadImageDocument(context, offline.getThumbnail(), holder.binding.imgThumb);
            } else {
                holder.binding.imgThumb.setImageResource(R.drawable.icon_document_default);
            }

            if (!Functions.isNullOrEmpty(offline.getTitle())) {
                holder.binding.tvTitle.setText(offline.getTitle());
            } else {
                holder.binding.tvTitle.setText("");
            }

            if (!Functions.isNullOrEmpty(offline.getTitleEN())) {
                holder.binding.tvDes.setText(offline.getTitleEN());
            } else {
                holder.binding.tvDes.setText("");
            }

            if (!Functions.isNullOrEmpty(offline.getDateDownload())) {
                long l = Functions.share.formatStringToLong(offline.getDateDownload(), Constants.formatDfDate);
                String date = Functions.share.formatLongToString(l, "HH:mm dd/MM/yyyy");
                holder.binding.tvDate.setText(date);
            } else {
                holder.binding.tvDate.setText("");
            }
            holder.binding.tvStatus.setVisibility(View.INVISIBLE);
        }
    }

    @Override
    public int getItemCount() {
        return offlines.size();
    }

    @Override
    public int getItemViewType(int position) {
        return offlines.get(position) == null ? TYPE_LOADING : TYPE_ITEM;
    }

    public void filter(String query, int caseSearch) {
        query = query.toLowerCase();

        offlines.clear();

        if (query.isEmpty()) {
            offlines.addAll(originalOfflines);
        } else {
            switch (caseSearch) {
                case 1:
                    for (DocumentOffline offline : originalOfflines) {
                        if (offline.getTitle().toLowerCase().contains(query)) {
                            offlines.add(offline);
                        }
                    }
                    break;
                case 2:
                    for (DocumentOffline offline : originalOfflines) {
                        if (offline.getTitleEN().toLowerCase().contains(query)) {
                            offlines.add(offline);
                        }
                    }
                    break;
                default:
                    for (DocumentOffline offline : originalOfflines) {
                        if (offline.getTitle().toLowerCase().contains(query) ||
                                offline.getTitleEN().toLowerCase().contains(query)) {
                            offlines.add(offline);
                        }
                    }
                    break;
            }
        }

        notifyDataSetChanged();
    }

    public class OfflineHolder extends RecyclerView.ViewHolder {
        private ItemCommentBinding binding;

        public OfflineHolder(@NonNull ItemCommentBinding itemView) {
            super(itemView.getRoot());
            binding = itemView;
            binding.getRoot().setOnClickListener(view -> listener.onItemClick(getAdapterPosition()));
        }
    }

    public class OfflineLoadingHolder extends RecyclerView.ViewHolder {

        public OfflineLoadingHolder(@NonNull ItemLoadingBinding itemView) {
            super(itemView.getRoot());
        }
    }
}
