import React from 'react';

import DockableTopbar from './Widgets/DockableTopbar';
import Minificable from './Widgets/Minificable';
import Closable from './Widgets/Closable';

export default class ComponentCatalog extends React.Component
{
	constructor ( props )
	{
		super( props );
		this.title = 'Component catalog';
	}

	render ()
	{
		return (
			<div className="component_catalog">
				<DockableTopbar>
					{this.props.title}
					<Minificable/>
					<Closable/>
				</DockableTopbar>
				<div className="component_catalog_itemtree"></div>
			</div>
		);
	}
}