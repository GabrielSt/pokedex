import styled from "styled-components";

export const GlassCard = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  width: 320px;
  height: 660px;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.3)
  );
  border-radius: 1rem;
  z-index: 2;
  backdrop-filter: blur(10px);
`;

export const Image = styled.img`
  top: 0;
  left: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  min-height: 50%;
  max-height: 50%;
  min-width: 100%;
  max-width: 100%;
`;

export const InfoWrapper = styled.div`
  padding: 10px;
  color: black;
`;

export const Title = styled.div`
  font-weight: bold;
  font-size: 1.4rem;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: normal;
  font-size: 0.8rem;
  padding-bottom: 10px;
  > div {
    display: flex;
    flex-direction: row;
    gap: 3px;
  }
`;

export const Type = styled.span.attrs((props: { color: string }) => props)`
  padding: 1px 10px;
  border-radius: 0.4rem;
  background-color: ${(props) => props.color};
`;

export const PowerSelection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding-top: 10px;
  border-top: 1px solid #999999;
`;

export const Btn = styled.div.attrs(
  (props: { color: string; tooltip: boolean }) => props
)`
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.color || "unset"};
  color: black;
  cursor: pointer;
  padding: ${(props) => (props.tooltip ? "15px 15px" : "15px 0px")};
  border-radius: 10px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease 0s;
  width: ${(props) => (props.tooltip ? "unset" : "45%")};
  justify-content: center;
  :hover {
    box-shadow: 0px 15px 20px rgba(33, 136, 95, 0.6);
    transform: translateY(-2px);
  }
`;

export const TooltipContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CaptureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  > div {
    cursor: pointer;
  }
`;
