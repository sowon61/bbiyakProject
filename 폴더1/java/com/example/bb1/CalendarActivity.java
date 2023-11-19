package com.example.bb1;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.util.TypedValue;
import android.view.MenuItem;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.prolificinteractive.materialcalendarview.CalendarDay;
import com.prolificinteractive.materialcalendarview.MaterialCalendarView;
import com.prolificinteractive.materialcalendarview.OnDateSelectedListener;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class CalendarActivity extends AppCompatActivity {

    private MaterialCalendarView calendarView;
    private DatabaseReference databaseReference;
    private BottomNavigationView bottomNavigationView;
    private TextView mappingIdTextView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.calendar);

        calendarView = findViewById(R.id.materialCalendar);
        bottomNavigationView = findViewById(R.id.bottomNavigationView);
        mappingIdTextView = findViewById(R.id.sideeffect);

        BottomNavigationView bottomNavigationView = findViewById(R.id.bottomNavigationView);
        bottomNavigationView.setSelectedItemId(R.id.Calendar);


        // Firebase에서 sideeffectIn 데이터 가져오기
        databaseReference = FirebaseDatabase.getInstance().getReference().child("user").child("sideeffectIn");

        // CalendarView의 날짜 선택 리스너 설정
        calendarView.setOnDateChangedListener(new OnDateSelectedListener() {
            @Override
            public void onDateSelected(@NonNull MaterialCalendarView widget, @NonNull CalendarDay date, boolean selected) {
                // 선택된 날짜 정보 가져오기
                int year = date.getYear();
                int month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
                int day = date.getDay();

                // 선택된 날짜를 date 형식으로 변환
                String formattedDate = String.format("%04d-%02d-%02d", year, month, day);

                // Firebase에서 데이터 필터링 및 표시
                databaseReference.orderByChild("date").equalTo(formattedDate).addListenerForSingleValueEvent(new ValueEventListener() {
                    @Override
                    public void onDataChange(DataSnapshot dataSnapshot) {
                        Log.d("FirebaseData", "DataSnapshot: " + dataSnapshot.toString()); // 로그 추가

                        StringBuilder sb = new StringBuilder("");

                        boolean hasSideEffect = false; // 부작용 여부를 나타내는 플래그

                        for (DataSnapshot snapshot : dataSnapshot.getChildren()) {
                            boolean checkbox1 = snapshot.child("checkbox1").getValue(Boolean.class);
                            boolean checkbox2 = snapshot.child("checkbox2").getValue(Boolean.class);
                            boolean checkbox3 = snapshot.child("checkbox3").getValue(Boolean.class);
                            boolean checkbox4 = snapshot.child("checkbox4").getValue(Boolean.class);
                            boolean checkbox5 = snapshot.child("checkbox5").getValue(Boolean.class);
                            boolean checkbox6 = snapshot.child("checkbox6").getValue(Boolean.class);
                            boolean checkbox7 = snapshot.child("checkbox7").getValue(Boolean.class);
                            boolean checkbox8 = snapshot.child("checkbox8").getValue(Boolean.class);

                            // checkbox 값이 true인 경우에 대한 처리
                            if (checkbox1) {
                                sb.append("소화장애,      ");
                                hasSideEffect = true; // 부작용이 있는 경우 플래그를 true로 설정
                            }
                            if (checkbox2) {
                                sb.append("발진,      ");
                                hasSideEffect = true; // 부작용이 있는 경우 플래그를 true로 설정
                            }
                            if (checkbox3) {
                                sb.append("두통 / 어지러움,      ");
                                hasSideEffect = true; // 부작용이 있는 경우 플래그를 true로 설정
                            }
                            if (checkbox4) {
                                sb.append("이명,      ");
                                hasSideEffect = true; // 부작용이 있는 경우 플래그를 true로 설정
                            }
                            if (checkbox5) {
                                sb.append("호흡곤란,      ");
                                hasSideEffect = true; // 부작용이 있는 경우 플래그를 true로 설정
                            }
                            if (checkbox6) {
                                sb.append("붓는 증상,      ");
                                hasSideEffect = true; // 부작용이 있는 경우 플래그를 true로 설정
                            }
                            if (checkbox7) {
                                sb.append("환각,      ");
                                hasSideEffect = true; // 부작용이 있는 경우 플래그를 true로 설정
                            }
                            if (checkbox8) {
                                sb.append("발열 \n");
                                hasSideEffect = true; // 부작용이 있는 경우 플래그를 true로 설정
                            }
                        }

                        // 마지막에 ", " 부분 제거
                        if (sb.length() > 0) {
                            sb.delete(sb.length() - 2, sb.length());
                        }

                        // 부작용 정보를 TextView에 설정
                        if (hasSideEffect) {
                            mappingIdTextView.setText(sb.toString());
                        } else {
                            mappingIdTextView.setText("부작용이 없습니다.");
                        }
                        }

                    @Override
                    public void onCancelled(DatabaseError databaseError) {
                        // 데이터 검색 중 오류 발생 시 처리
                    }
                });
            }
        });


        DatabaseReference databaseReference = FirebaseDatabase.getInstance().getReference("user/medicationP");

        databaseReference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                for (DataSnapshot snapshot : dataSnapshot.getChildren()) {
                    String time = snapshot.child("time").getValue(String.class);

                    String currentDate = new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault()).format(new Date());

                    if (currentDate.equals(time)) {
                        // 만약 현재 날짜가 time과 일치한다면 해당 데이터를 TextView에 보여줍니다
                        String daysC = snapshot.child("daysC").getValue(String.class);
                        String daysNo = snapshot.child("daysNo").getValue(String.class);
                        String daysTotal = snapshot.child("daysTotal").getValue(String.class);
                        String medicationNo = snapshot.child("medicationNo").getValue(String.class);
                        String medicineNo = snapshot.child("medicineNo").getValue(String.class);
                        String startD = snapshot.child("startD").getValue(String.class);

                        TextView textView = findViewById(R.id.medi);
                        String textToShow = "일수: " + daysC + "\n" +
                                "횟수: " + daysNo + "\n" +
                                "총 횟수: " + daysTotal + "\n" +
                                "약 번호: " + medicineNo + "\n" +
                                "시작일: " + startD;

                        textView.setText(textToShow);
                        textView.setTextSize(TypedValue.COMPLEX_UNIT_SP, 30);
                    }
                }
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                // 오류 처리가 필요한 경우
            }
        });


        // BottomNavigationView의 선택 리스너 설정
        bottomNavigationView.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                switch (item.getItemId()) {
                    case R.id.home:
                        startActivity(new Intent(CalendarActivity.this, Main.class));
                        return true;

                    case R.id.Calendar:
                        // 이미 CalendarActivity를 실행 중인 경우 다시 시작하지 않도록 처리
                        startActivity(new Intent(CalendarActivity.this, CalendarActivity.class));
                        finish(); // 현재 액티비티 종료
                        return true;

                    case R.id.ocr:
                        startActivity(new Intent(CalendarActivity.this, Ocr.class));
                        return true;

                    case R.id.mypage:
                        startActivity(new Intent(CalendarActivity.this, Mypage.class));
                        return true;

                    default:
                        return false;
                }
            }
        });
    }
}
