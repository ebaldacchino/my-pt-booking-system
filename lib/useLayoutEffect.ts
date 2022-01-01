import React from 'react';

export const useLayoutEffect =
	typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export default useLayoutEffect;
