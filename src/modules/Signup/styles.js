import styled from 'react-emotion';
import backgroundImage from '../../assets/gloomhaven-map.jpg';

export const SignupPage = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    linear-gradient(
      rgba(191, 81, 16, 0.79),
      rgba(58, 0, 13, 0.9)
    ),
    url(${backgroundImage});
  background-size: cover;
`;

export const Title = styled.h1`
  text-align: center;
  font-weight: 100;
  color: white;
`;
