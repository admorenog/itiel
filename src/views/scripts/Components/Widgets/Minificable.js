import React from 'react';

export default class Minificable extends React.Component
{
	constructor ( props )
	{
		super( props );
		this.target = props.target;
		this.toggledBy = props.toggledBy;
	}

	render ()
	{
		return (
			<div className="minificable">
				<img src="asset://icons/arrow_left.svg"></img>
			</div>
		);
	}

	componentDidMount()
	{
		ReactDOM.findDOMNode( this ).addEventListener( 'click', ( event ) => {
			let elementToToggle = document.getElementById( this.target );
			let elementToggleBy = document.getElementById( this.toggledBy );
			if( elementToToggle.classList.contains( "hidden" ) )
			{
				elementToToggle.classList.remove( "hidden" );
				elementToggleBy.classList.add( "hidden" );
			}
			else
			{
				elementToToggle.classList.add( "hidden" );
				elementToggleBy.classList.remove( "hidden" );
			}
			console.log( elementToToggle, elementToggleBy );
		} );
	}
}