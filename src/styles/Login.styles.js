// src/styles/Login.styles.js
import styled from 'styled-components'

export const LoginWrapper = styled.div`
  max-width: 420px;
  margin: 100px auto;
  padding: 40px;
  border-radius: 20px;
  background: rgba(25, 25, 35, 0.55);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
  text-align: center;
  color: #f9fafb;
  font-family: "Vazirmatn", sans-serif;
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  color: #facc15;
  margin-bottom: 24px;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 0.95rem;
  color: #d1d5db;
`;

export const Input = styled.input`
  width: 100%;
  margin-top: 6px;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  font-size: 1rem;
  transition: 0.2s;

  &:focus {
    outline: none;
    border-color: #facc15;
    background: rgba(255, 255, 255, 0.15);
  }
`;

export const Button = styled.button`
  margin-top: 16px;
  padding: 10px 14px;
  background: linear-gradient(135deg, #facc15, #eab308);
  color: #1f2937;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background: linear-gradient(135deg, #fde047, #facc15);
    transform: scale(1.03);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Error = styled.p`
  color: #f87171;
  font-size: 0.9rem;
  margin-top: -8px;
`;
