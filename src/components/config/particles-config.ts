const particlesConfig = {
	fpsLimit: 60,
	fullScreen: {
		enable: true,
	},
	particles: {
		links: {
			distance: 70,
			enable: true,
			width: 1.5,
		},
		number: {
			value: 90,
			density: {
        enable: true,
        value_area: 1100
      }
		},
		move: {
			speed: 1,
			enable: true,
		},
		size: {
			value: 2,
		},
		shape: {
			type: 'circle',
		},
	},
	retina_detect: true, 
	
};

export default particlesConfig;
