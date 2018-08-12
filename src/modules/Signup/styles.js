import styled from 'react-emotion';
import backgroundImage from '../../assets/gloomhaven-map.jpg';

export const SignupPage = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    linear-gradient(
      rgba(208, 227, 127, 0.93),
      rgba(158, 173, 98, 0.95)
    ),
    url(${backgroundImage});
  background-size: cover;
`;
