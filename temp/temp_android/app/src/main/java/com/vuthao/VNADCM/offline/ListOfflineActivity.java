package com.vuthao.VNADCM.offline;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;

import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.View;
import android.webkit.URLUtil;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.ItemTouchHelper;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.vuthao.VNADCM.R;
import com.vuthao.VNADCM.base.Constants;
import com.vuthao.VNADCM.base.DCMApplication;
import com.vuthao.VNADCM.base.Functions;
import com.vuthao.VNADCM.base.activity.BaseActivity;
import com.vuthao.VNADCM.base.custom.SwipeHelper;
import com.vuthao.VNADCM.base.model.app.DocumentOffline;
import com.vuthao.VNADCM.base.realm.RealmDocumentOfflineController;
import com.vuthao.VNADCM.databinding.ListOfflineFragmentBinding;
import com.vuthao.VNADCM.document.DocumentDetailWebActivity;

import java.util.ArrayList;
import java.util.List;

import static java.security.AccessController.getContext;

public class ListOfflineActivity extends BaseActivity implements OfflineAdapter.OfflineListener, TypeSearchAdapter.ChangeTypeSearch {
    private ListOfflineFragmentBinding binding;
    private RealmDocumentOfflineController controller;
    private ArrayList<DocumentOffline> data;
    private OfflineAdapter adapter;
    private TypeSearchAdapter typeSearchAdapter;
    private Context context;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        binding = ListOfflineFragmentBinding.inflate(getLayoutInflater());
        super.onCreate(savedInstanceState);
        setContentView(binding.getRoot());
        init();
        binding.imgBack.setOnClickListener(l->finish());
        binding.iconClear.setOnClickListener(l->binding.edtContent.setText(""));
        binding.edtContent.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                adapter.filter(s.toString(),typeSearchAdapter.selectedItem);
            }
        });
    }
    private void init()
    {
        context=getBaseContext();
        controller= new RealmDocumentOfflineController();
        data=controller.getAll();
        if(data.isEmpty())
        {
            binding.lnNodata.setVisibility(View.VISIBLE);
        }
        else {
            adapter= new OfflineAdapter(this,data,this);
            binding.lvItems.setLayoutManager(new LinearLayoutManager(this));
            binding.lvItems.setAdapter(adapter);

            new SwipeHelper(context,binding.lvItems,false){

                @Override
                public void instantiateUnderlayButton(RecyclerView.ViewHolder viewHolder, List<UnderlayButton> underlayButtons) {
                    underlayButtons.add(
                            new UnderlayButton(
                                    context,
                                    "Delete",
                                    getDrawable(R.drawable.icon_delete_red),
                                    getColor(R.color.white),
                                    getColor(R.color.white),
                                    new UnderlayButtonClickListener() {
                                        @Override
                                        public void onClick(int pos) {
                                            controller.updatePath(data.get(pos).getDocumentId(),"");
                                            data.remove(pos);
                                            adapter.setData(data);
                                            if(data.isEmpty())
                                            {
                                                binding.lnNodata.setVisibility(View.VISIBLE);
                                            }
                                        }
                                    }

                            )
                    );
                }
            };





            ArrayList<String> typeSearch= new ArrayList<>();
            typeSearch.add(this.getString(R.string.all));
            typeSearch.add(this.getString(R.string.t_n_v_n_b_n));
            typeSearch.add(this.getString(R.string.t_n_vi_t_t_t));
            typeSearchAdapter= new TypeSearchAdapter(this,this,typeSearch);
            LinearLayoutManager ln=new LinearLayoutManager(this);
            ln.setOrientation(RecyclerView.HORIZONTAL);
            binding.lvTypeSearch.setLayoutManager(ln);
            binding.lvTypeSearch.setAdapter(typeSearchAdapter);
        }
    }
    @Override
    protected void onResume() {
        super.onResume();
        binding.shimmer.startShimmerAnimation();
        DCMApplication.getInstance().trackScreenView("ListOfflineActivity");
    }

    @Override
    protected void onPause() {
        binding.shimmer.stopShimmerAnimation();
        super.onPause();
    }

    @Override
    public void onItemClick(int pos) {
        Intent intent = new Intent(this, DocumentDetailWebActivity.class);
        String url= data.get(pos).getUrl();
        ArrayList<Integer> params = Functions.share.getParameterUrlDoc(url);
        if (!params.isEmpty()) {
            intent.putExtra("ResourceId", params.get(0));
            intent.putExtra("DocumentGroupId", params.get(1));
            intent.putExtra("CategoryId", params.get(2));
        } else {
            boolean isValid = URLUtil.isValidUrl(url);
            if (isValid) {
                this.startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url)));
            } else {
                if (url.indexOf(Constants.SUB_SITE) > 0) {
                    url = Constants.BASE_URL + url;
                } else {
                    url = Constants.BASE_URL + "/" + Constants.SUB_SITE + url;
                }
            }
            intent.putExtra("Url", url + "&Mobile=thachdepzai");
        }
        intent.putExtra("isOffline", true);

        this.startActivity(intent);
    }

    @Override
    public void onChangeType(int position) {

        adapter.filter(binding.edtContent.getText().toString(),position);
    }
}
