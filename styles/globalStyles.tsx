import React from 'react';
import { Global } from '@emotion/react';
import tw, { css, theme, GlobalStyles as BaseStyles } from 'twin.macro';

const customStyles = css`
	html {
		-webkit-tap-highlight-color: transparent;
	}

	@media (max-width: 266.65px) {
		* {
			font-size: 6vw;
		}
	}
	@media (min-width: 2000px) {
		* {
			font-size: 0.8vw;
		}
	}
`;

const GlobalStyles = () => (
	<>
		<BaseStyles />
		<Global styles={customStyles} />
	</>
);

export default GlobalStyles;
