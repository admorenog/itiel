import React from 'react';

import MainMenu from './Components/MainMenu';
import ComponentCatalog from './Components/ComponentCatalog';
import Workflow from './Components/Workflow';
import Console from './Components/Console';
import StatusBar from './Components/StatusBar';

class Main extends React.Component
{
	render ()
	{
		return (
			<div id="window" className="window">
				<MainMenu />
				<ComponentCatalog />
				<Workflow />
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
