import React from 'react';
import DockableTopbar from './Widgets/DockableTopbar';
import Minificable from './Widgets/Minificable';
import Closable from './Widgets/Closable';

export default class Console extends React.Component
{
	constructor ( props )
	{
		super( props );
	}

	render ()
	{
		return (
			<div className="console">
				<DockableTopbar>
					{this.props.title}
					<Minificable/>
				</DockableTopbar>
			</div>
		);
	}
}