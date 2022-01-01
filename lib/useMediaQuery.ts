import React from 'react'
export const useMediaQuery = () => {
	const [values, setValues] = React.useState({
		isDesktop: false,
		isMobile: true,
	});
	React.useLayoutEffect(() => {
		if (!window) return;
		const { innerWidth: w } = window;
		const handleResize = () => {
			setValues({
				isDesktop: w >= 1024,
				isMobile: w < 640,
			});
		};
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	return values;
};
