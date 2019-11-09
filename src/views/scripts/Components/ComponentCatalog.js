import React from 'react';

import DockableTopbar from './Widgets/DockableTopbar';
import Collapsable from './Widgets/Collapsable';
import CollapsableItem from './Widgets/CollapsableItem';

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
			<div id="component_catalog" className="component_catalog">
				<DockableTopbar>
					<Collapsable title="Component catalog">
						<CollapsableItem type="ScriptInput" text="Script Input" icon="asset://icons/icon.png"></CollapsableItem>
						<CollapsableItem type="Transformation" text="Transformation" icon="asset://icons/Rhapsody.png"></CollapsableItem>
						<CollapsableItem type="Output" text="Output" icon="asset://icons/icon.png"></CollapsableItem>
						<CollapsableItem type="Filter" text="Filter" icon="asset://icons/icon.png"></CollapsableItem>
					</Collapsable>
				</DockableTopbar>
				<div className="component_catalog_itemtree"></div>
			</div>
		);
	}
}