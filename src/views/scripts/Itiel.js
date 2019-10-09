import React from 'react';

import MainMenu from './Components/MainMenu';
import ComponentsSidebar from './Components/ComponentsSidebar';
import Board from './Components/Board';
import Console from './Components/Console';
import StatusBar from './Components/StatusBar';

class Main extends React.Component
{
	render ()
	{
		return (
			<div id="window" className="window">
				<MainMenu />
				<ComponentsSidebar />
				<Board />
				<Console />
				<StatusBar />
			</div>
		);
	}
}

// ========================================

ReactDOM.render(
	<Main />,
	document.getElementById( 'root' )
);
