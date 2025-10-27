// src/styles/PostsPage.styles.js
import styled from 'styled-components'

export const Wrapper = styled.div`
  max-width: 1000px;
  margin: 40px auto;
  padding: 32px;
  font-family: "Vazirmatn", sans-serif;
  color: #e5e7eb;
  background: rgba(25, 25, 35, 0.55);
  border-radius: 20px;
  backdrop-filter: blur(25px) saturate(180%);
  -webkit-backdrop-filter: blur(25px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 40px;
  color: #facc15;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
`;

export const SubTitle = styled.h2`
  font-size: 1.6rem;
  margin: 40px 0 16px;
  color: #a5b4fc;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const GlassTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(10px);
`;

export const TH = styled.th`
  text-align: right;
  padding: 14px;
  background: rgba(255, 255, 255, 0.12);
  font-weight: 600;
  color: #f3f4f6;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
`;

export const TD = styled.td`
  padding: 12px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  text-align: right;
  color: #e5e7eb;
`;

export const TR = styled.tr`
  transition: background 0.25s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const Section = styled.div`
  margin-bottom: 50px;
`;

export const Centered = styled.div`
  text-align: center;
  color: #fff;
  margin-top: 100px;
  font-size: 1.3rem;
`;
