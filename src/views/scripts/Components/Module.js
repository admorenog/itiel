import React from 'react';


/**
 * name label centered
 * On drop should be moved into a free area of a grid.
 * Can be edited by pressing F2 (name), right click (options, including renaming) and
 * double click (open modal editor).
 * Should show a tooltip with information about the module itself (complete name, documentation and
 * user comments).
 * Can be removable.
 * Has inputs and output tails that can be connectables into other modules.
 */
export default class Module extends React.Component
{
	constructor ( props )
	{
		super( props );
		this.name = props.name;
		this.type = props.type;
		this.x = props.x;
		this.y = props.y;
	}

	render ()
	{
		return (
			<div
				className={ "module " + this.type } draggable="true"
				style={ { position : 'absolute', left: this.x, top: this.y } }
				data-type={ this.type } data-name={ this.name }>
				<div className={ "module-icon" }></div>
				<div className={ "module-text" }>{ this.name }</div>
			</div>
		);
	}

	componentDidMount()
	{
		ReactDOM.findDOMNode( this ).addEventListener( 'dragstart', ( event ) => {
			// event.stopPropagation();
  			event.dataTransfer.setData( "type", event.currentTarget.getAttribute( "data-type" ) );
  			event.dataTransfer.setData( "name", event.currentTarget.getAttribute( "data-name" ) );
  			event.dataTransfer.setData( "origin", "workflow" );
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

		document.addEventListener( 'mouseover', ( event ) => {
			if ( event.target.matches( '.module-icon' )
			  || event.target.matches( '.module-text' ) )
			{
				let tooltipElement = document.querySelector( ".help-and-tips" );
				if( tooltipElement.classList.contains( "hidden" ) )
				{
					let moduleElement = event.target.parentNode;
					let moduleStyle = moduleElement.style;

					let leftPositionOfModule = parseInt( moduleStyle.left.replace( /px/ig, "" ) );
					let widthOfModule = moduleElement.offsetWidth;
					let tooltipLeftPosition = leftPositionOfModule + widthOfModule + 'px';

					tooltipElement.style.left = tooltipLeftPosition;
					tooltipElement.style.top = moduleStyle.top;
					tooltipElement.classList.remove( "hidden" );

					let tooltipTitleElement = tooltipElement.querySelector( ".help-and-tips-title" );
					let tooltipBodyElement = tooltipElement.querySelector( ".help-and-tips-body" );

					let moduleText = moduleElement.querySelector( ".module-text" );
					let moduleType = moduleText.innerHTML;
					tooltipTitleElement.innerHTML = moduleType;
					tooltipBodyElement.innerHTML = "probando2";
				}
			}
		} );

		document.addEventListener( 'mouseout', ( event ) => {
			if ( event.target.matches( '.module' )
			  || event.target.matches( '.module-icon' )
			  || event.target.matches( '.module-text' )
			  || event.target.matches( '.help-and-tips' )
			  || event.target.matches( '.help-and-tips-title' )
			  || event.target.matches( '.help-and-tips-body' ) )
			{
				if( !event.toElement.matches( ".help-and-tips" )
				 && !event.toElement.matches( '.help-and-tips-title' )
				 && !event.toElement.matches( '.help-and-tips-body' )
				 && !event.toElement.matches( '.module' )
				 && !event.toElement.matches( '.module-icon' )
				 && !event.toElement.matches( '.module-text' ) )
				{
					let tooltipElement = document.querySelector( ".help-and-tips" );
					tooltipElement.classList.add( "hidden" );
				}
			}
		} );

		document.addEventListener( 'mousedown', ( event ) => {
			if ( event.target.matches( '.module' )
			  || event.target.matches( '.module-icon' )
			  || event.target.matches( '.module-text' ) )
			{
			let tooltipElement = document.querySelector( ".help-and-tips" );
			tooltipElement.classList.add( "hidden" );
			}
		} );


		document.addEventListener( "drop", ( event ) => {
			debugger;
		} );
	}
}