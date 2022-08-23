import Particles from 'react-tsparticles';
import particlesConfig from './config/particles-config';
import { loadFull } from 'tsparticles';
import { Engine } from 'tsparticles-engine';
import { useCallback } from 'react';

const ParticlesBg = () => {
	const particlesInit = useCallback(async (engine: Engine) => {
		await loadFull(engine);
	}, []);

	return (
		<Particles
			id='tsparticles'
			init={particlesInit}
			options={particlesConfig}
		/>
	);
};

export default ParticlesBg;
