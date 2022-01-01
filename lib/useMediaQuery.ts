import React from 'react';
import useLayoutEffect from './useLayoutEffect';
const useMediaQuery = () => {
	const [values, setValues] = React.useState({
		isDesktop: false,
		isMobile: false,
	});
	useLayoutEffect(() => {
		const handleResize = () => {
			const { innerWidth: w } = window;
			setValues({
				isDesktop: w >= 1024,
				isMobile: w < 640,
			});
		};
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	return values;
};

export default useMediaQuery;
