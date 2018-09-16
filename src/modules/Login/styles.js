import styled from 'react-emotion';
import backgroundImage from '../../assets/gloomhaven-map.jpg';

export const LoginPage = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    linear-gradient(
      rgba(159, 106, 220, 0.82),
      rgba(47, 31, 66, 0.95)
    ),
    url(${backgroundImage});
  background-size: cover;
`;

export const Title = styled.h1`
  text-align: center;
  font-weight: 100;
  color: white;
`;
