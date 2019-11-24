import React from 'react';

export default class CollapsableItem extends React.Component
{
	constructor ( props )
	{
		super( props );
		this.text = props.text;
		this.icon = props.icon;
		this.type = props.type;
	}

	render ()
	{
		return (
			<div className="collapsable-item" draggable="true" data-type={ this.type }
			data-name={ this.type }>
				<img className="collapsable-icon" src={ this.icon }></img>
				<span className="collapsable-text hidden">{ this.text }</span>
			</div>
		);
	}

	componentDidMount()
	{
		ReactDOM.findDOMNode( this ).addEventListener( 'dragstart', ( event ) =>
		{
			event.stopPropagation();
  			event.dataTransfer.setData( "type", event.currentTarget.getAttribute( "data-type" ) );
			event.dataTransfer.setData( "origin", "item-tree" );

			let div = document.querySelector( ".drag-shadow" );
			div.style.top = event.y + "px";
			div.style.left = event.x + "px";

			// TODO: we cannot achieve the expected result with setDragImage, but we can
			// create a module with transparency into the workflow and move it to the expected
			// place. To remove the default drag image we can set it to a transparent pixel.
			var img = new Image();
			img.src = "asset://img/transparent.gif";
			img.style.display = "none";
			event.dataTransfer.setDragImage( img, 0, 0 );
			event.dataTransfer.effectAllowed = "move";
			event.dataTransfer.dropEffect = "none";
		}, false );

		ReactDOM.findDOMNode( this ).addEventListener( 'drag', ( event ) =>
		{
			let div = document.querySelector( ".drag-shadow" );
			div.style.top = event.y + "px";
			div.style.left = event.x + "px";
		} );
	}
}