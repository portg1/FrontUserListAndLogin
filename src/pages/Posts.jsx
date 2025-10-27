// src/pages/PostsPage.jsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styled from "styled-components";
import {
  Wrapper,
  Title,
  SubTitle,
  GlassTable,
  TH,
  TD,
  TR,
  Section,
  Centered,
} from '../styles/PostsPage.styles'


const api = axios.create({
  baseURL: "https://BrsApi.ir/Api/Market/",
});

async function getPosts() {
  const { data } = await api.get(
    "Gold_Currency.php?key=BYRgf2q2MNrbQxsqI82btiE8Gse563ue"
  );
  return data;
}

export default function PostsPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (isLoading) return <Centered>در حال بارگذاری...</Centered>;
  if (isError) return <Centered>خطا: {error.message}</Centered>;

  return (
    <Wrapper>
      <Title>💰 قیمت طلا و ارز</Title>

      {data.gold && (
        <Section>
          <SubTitle>🏆 طلا</SubTitle>
          <GlassTable>
            <thead>
              <tr>
                <TH>نام</TH>
                <TH>قیمت</TH>
                <TH>تغییر</TH>
                <TH>درصد</TH>
                <TH>تاریخ</TH>
                <TH>زمان</TH>
              </tr>
            </thead>
            <tbody>
              {data.gold.map((item) => (
                <TR key={item.symbol}>
                  <TD>{item.name}</TD>
                  <TD>{item.price.toLocaleString()} {item.unit}</TD>
                  <TD
                    style={{
                      color: item.change_value >= 0 ? "#4ade80" : "#f87171",
                      fontWeight: "600",
                    }}
                  >
                    {item.change_value.toLocaleString()}
                  </TD>
                  <TD>{item.change_percent}%</TD>
                  <TD>{item.date}</TD>
                  <TD>{item.time}</TD>
                </TR>
              ))}
            </tbody>
          </GlassTable>
        </Section>
      )}

      {data.currency && (
        <Section>
          <SubTitle>💵 ارز</SubTitle>
          <GlassTable>
            <thead>
              <tr>
                <TH>نام</TH>
                <TH>قیمت</TH>
                <TH>تغییر</TH>
                <TH>درصد</TH>
                <TH>تاریخ</TH>
                <TH>زمان</TH>
              </tr>
            </thead>
            <tbody>
              {data.currency.map((item) => (
                <TR key={item.symbol}>
                  <TD>{item.name}</TD>
                  <TD>{item.price.toLocaleString()} {item.unit}</TD>
                  <TD
                    style={{
                      color: item.change_value >= 0 ? "#4ade80" : "#f87171",
                      fontWeight: "600",
                    }}
                  >
                    {item.change_value.toLocaleString()}
                  </TD>
                  <TD>{item.change_percent}%</TD>
                  <TD>{item.date}</TD>
                  <TD>{item.time}</TD>
                </TR>
              ))}
            </tbody>
          </GlassTable>
        </Section>
      )}
    </Wrapper>
  );
}

