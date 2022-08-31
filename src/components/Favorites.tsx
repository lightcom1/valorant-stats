import './favorites.scss';
import { useEffect, useState } from 'react';

const Favorites = ({ setShowFavorites, setNickname }: any) => {
	const [favorites, setFavorites] = useState<any[]>([]);

	useEffect(() => {
		const favoritesLC = JSON.parse(localStorage.getItem('favorites')!) || [];
		setFavorites(favoritesLC);
	}, []);

	const handleFavoritesClick = (name: string) => {
		setNickname(name);
		setShowFavorites(false);
	};

	const handleDelete = (id: number) => {
		const filteredFavorites = favorites.filter(player => player.id !== id);

		localStorage.setItem('favorites', JSON.stringify([...filteredFavorites]));
		setFavorites([...filteredFavorites]);
	};

	return (
		<div className='favorites-modal'>
			<div
				className='close-btn'
				onClick={() => setShowFavorites(false)}>
				<svg
					width='40'
					height='40'
					viewBox='0 0 40 40'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M11 28.8926L28.8926 11'
						stroke='white'
						strokeWidth='1.5'
						strokeLinecap='round'
					/>
					<path
						d='M11 11L28.8926 28.8926'
						stroke='white'
						strokeWidth='1.5'
						strokeLinecap='round'
					/>
				</svg>
			</div>
			<div className='favorites-names'>
				{favorites.length < 1 && 'Favorites list is empty'}
				{favorites.map(player => (
					<div className='favorites-wrapper' key={player.id}>
						<p
							className='favorites-wrapper--name'
							onClick={() => handleFavoritesClick(player.name)}>
							{player.name}
						</p>
						<span className='delete' onClick={() => handleDelete(player.id)}>
							<svg
								width='30'
								height='30'
								viewBox='0 0 30 30'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M12.5 2.8125C11.9822 2.8125 11.5625 3.23223 11.5625 3.75V4.6875H6.25C5.73223 4.6875 5.3125 5.10723 5.3125 5.625C5.3125 6.14277 5.73223 6.5625 6.25 6.5625H23.75C24.2678 6.5625 24.6875 6.14277 24.6875 5.625C24.6875 5.10723 24.2678 4.6875 23.75 4.6875H18.4375V3.75C18.4375 3.23223 18.0178 2.8125 17.5 2.8125H12.5Z'
									fill='red'
								/>
								<path
									d='M12.5 13.3125C13.0178 13.3125 13.4375 13.7322 13.4375 14.25L13.4375 23C13.4375 23.5178 13.0178 23.9375 12.5 23.9375C11.9822 23.9375 11.5625 23.5178 11.5625 23L11.5625 14.25C11.5625 13.7322 11.9822 13.3125 12.5 13.3125Z'
									fill='red'
								/>
								<path
									d='M18.4375 14.25C18.4375 13.7322 18.0178 13.3125 17.5 13.3125C16.9822 13.3125 16.5625 13.7322 16.5625 14.25V23C16.5625 23.5178 16.9822 23.9375 17.5 23.9375C18.0178 23.9375 18.4375 23.5178 18.4375 23V14.25Z'
									fill='red'
								/>
								<path
									fillRule='evenodd'
									clipRule='evenodd'
									d='M7.48928 9.89647C7.54203 9.42169 7.94334 9.0625 8.42105 9.0625H21.5789C22.0566 9.0625 22.458 9.42169 22.5107 9.89647L22.7609 12.1482C23.2144 16.2298 23.2144 20.3491 22.7609 24.4308L22.7363 24.6525C22.5562 26.2727 21.3006 27.5646 19.6861 27.7906C16.5772 28.2258 13.4228 28.2258 10.3138 27.7906C8.69943 27.5646 7.44375 26.2727 7.26372 24.6525L7.23909 24.4308C6.78558 20.3491 6.78558 16.2298 7.23909 12.1482L7.48928 9.89647ZM9.26015 10.9375L9.10263 12.3552C8.6644 16.2992 8.6644 20.2797 9.10263 24.2237L9.12726 24.4454C9.21263 25.2138 9.80815 25.8265 10.5738 25.9337C13.5103 26.3448 16.4897 26.3448 19.4262 25.9337C20.1918 25.8265 20.7874 25.2138 20.8727 24.4454L20.8974 24.2237C21.3356 20.2797 21.3356 16.2993 20.8974 12.3552L20.7398 10.9375H9.26015Z'
									fill='red'
								/>
							</svg>
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default Favorites;
