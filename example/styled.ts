import styled, {injectGlobal} from 'styled-components';
import './higlight';

injectGlobal`
  body {
    background-color: #FF98FD;
    font-family: Consolas, monaco, monospace;
    -webkit-font-smoothing: antialiased;
    line-height: 28px;
  }

  pre {
    background-color: #FFD863;
    text-shadow: 1px 1px white;
  }

  code.javascript {
    text-shadow: none;
  }

  .github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}

  svg {
    fill:#64CEAA; color:#fff; position: absolute; top: 0; border: 0; right: 0;
  }
`;

export const AppWrapper = styled.div`
  max-width: 600px;
  background-color: white;
  margin: 0 auto;
  padding: 15px;
`;