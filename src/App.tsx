import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { useStore } from 'zustand';
import { CountStore } from './store';

interface I_CategoryButton {
  button_id: string;
  now_category: string;
};

const Wrapper = styled.div`
  width: 100dvw;
  height: 90dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ToDayTextBox = styled.div`
  width: 85%;
  max-width: 500px;
  height: 8%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(223, 230, 233);
  font-size: 18px;
  font-weight: 550;
  border: 3px solid black;
  border-radius: 5px;
`;

const CountButtonBox = styled.div`
  width: 85%;
  max-width: 500px;
  height: 65%;
  margin-top: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(223, 230, 233);
  border: 3px solid black;
  border-radius: 5px;
`;

const CategoryButtonBox = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-top-right-radius: inherit;
  border-top-left-radius: inherit;
`;

const CategoryButton = styled.div<I_CategoryButton>`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.button_id !== props.now_category ? "white" : "black"};
    background-color: ${(props) => props.button_id !== props.now_category ? "black" : "rgb(223, 230, 233)"};
    font-weight: 600;
    font-size: 17px;
`;

const CounterBox = styled.div`
  width: 80%;
  height: 60%;
  margin-top: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .now_counts {
    width: 70%;
    max-width: 165px;
    height: 10%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 2px solid black;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 500;

    label {
      width: 60%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      background-color: black;
    }
    span {
      width: 40%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  };
`;

const CounterButton = styled.div`
  width: 160px;
  height: 160px;
  margin-top: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(99, 110, 114);
  border: 3px solid rgb(85, 93, 96);
  border-radius: 7px;
`;

const ResetButton = styled.div`
  width: 130px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(220, 221, 225);
  background-color: rgb(235, 77, 75);
  border: 3px solid rgb(220, 221, 225);
  border-radius: 8px;
  font-size: 17px;
  font-weight: 600;
`;

export default function App(){
  const {
    delivery_count, pickup_count, update_d_count, 
    update_p_count, resetCount
  } = useStore(CountStore);

  const [Todays, setTodays] = useState("");
  const [NowCategory, setNowCategory] = useState("D");

  const CountBtnClicked = (button_id: string) => {
    if(button_id === "D"){
      update_d_count(delivery_count + 1);
    } else if(button_id === "P"){
      update_p_count(pickup_count + 1);
    } else {
      alert("button_id error");
    }
  }

  const ResetBtnClicked = () => {
    const confirm = window.confirm("배달 및 픽업 주문 횟수를 초기화 하겠습니까?")

    if(!confirm){
      return;
    } else {
      resetCount();
    }
  };

  useEffect(() => {
    const DayTexts = ["일", "월", "화", "수", "목", "금", "토"];

    const DateObject = new Date();
    const FullYears = DateObject.getFullYear();
    const Months = DateObject.getMonth() + 1;
    const Dates = DateObject.getDate();
    const GetDayTexts = DayTexts[DateObject.getDay()];

    setTodays(`${FullYears}년 ${Months}월 ${Dates}일 (${GetDayTexts})`);
  }, []);

  return (
    <Wrapper>
      <ToDayTextBox>{Todays}</ToDayTextBox>
      <CountButtonBox>
        <CategoryButtonBox>
          <CategoryButton 
            className='delivery_button' 
            button_id='D' 
            now_category={NowCategory} 
            onClick={() => setNowCategory("D")}
          >배달</CategoryButton>
          <CategoryButton 
            className='pickup_button' 
            button_id='P' 
            now_category={NowCategory}
            onClick={() => setNowCategory("P")}
          >픽업</CategoryButton>
        </CategoryButtonBox>
        {
          NowCategory === "D" ? (
            <CounterBox>
              <div className='now_counts'>
                <label>주문 횟수</label>
                <span>{delivery_count}</span>
              </div>
              <CounterButton onClick={() => CountBtnClicked("D")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={"80"} height={"80"}>
                  <path fill="rgb(220, 221, 225)" d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"/>
                </svg>
              </CounterButton>
            </CounterBox>
          ) : null
        }
        {
          NowCategory === "P" ? (
            <CounterBox>
              <div className='now_counts'>
                <label>주문 횟수</label>
                <span>{pickup_count}</span>
              </div>
              <CounterButton onClick={() => CountBtnClicked("P")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={"80"} height={"80"}>
                  <path fill="rgb(220, 221, 225)" d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"/>
                </svg>
              </CounterButton>
            </CounterBox>
          ) : null
        }
        <ResetButton onClick={ResetBtnClicked}>초기화</ResetButton>
      </CountButtonBox>      
    </Wrapper>
  );
};
