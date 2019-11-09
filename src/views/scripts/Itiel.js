import React from 'react';

import MainMenu from './Components/MainMenu';
import ComponentCatalog from './Components/ComponentCatalog';
import Workflow from './Components/Workflow';
import Console from './Components/Console';
import StatusBar from './Components/StatusBar';
import Tooltip from './Components/Tooltip';

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
				<Tooltip />
			</div>
		);
	}
}

// ========================================

ReactDOM.render(
	<Main />,
	document.getElementById( 'root' )
);
