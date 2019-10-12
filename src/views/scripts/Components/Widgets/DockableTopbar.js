import React from 'react';

export default class DockableTopbar extends React.Component
{
	constructor ( props )
	{
		super( props );
	}

	render ()
	{
		return (
			<div className="dockbar">
				{this.props.children}
			</div>
		);
	}
}