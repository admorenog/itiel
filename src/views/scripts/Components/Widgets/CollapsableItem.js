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

			// var img = new Image( 50, 60 );
			// img.src = "asset://icons/icon.png";
			// img.classList.add( "drag-icon" );
			// var div = document.createElement( "div" );
			// div.style.position = "absolute"; div.style.top = "0px"; div.style.left= "-500px";
			// document.querySelector( 'body' ).appendChild( div );
			// div.appendChild( img );

			// TODO: we cannot achieve the expected result with setDragImage, but we can
			// create a module with transparency into the workflow and move it to the expected
			// place.
			// event.dataTransfer.setDragImage( div, 0, 0 );

		} );

		ReactDOM.findDOMNode( this ).addEventListener( 'dragenter', ( event ) => {
			event.preventDefault();
		} );

		ReactDOM.findDOMNode( this ).addEventListener( 'dragleave', ( event ) => {
			event.preventDefault();
		} );

		ReactDOM.findDOMNode( this ).addEventListener( 'dragover', ( event ) => {
			event.preventDefault();
			event.dataTransfer.dropEffect = 'copy';
		} );
	}
}