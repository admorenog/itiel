import React from 'react';

export default class Collapsable extends React.Component
{
	constructor ( props )
	{
		super( props );
		this.title = props.title;
		this.collapsed_src = "asset://icons/arrow_left.svg";
		this.expanded_src = "asset://icons/arrow_right.svg";
		this.isCollapsed = true;
	}

	render ()
	{
		return (
			<div className="collapsable">
				<div className="collapsable-item">
					<span className="collapsable-title collapsable-text hidden">
						{ this.title }
					</span>
					<img
						className="collapsable-icon collapse-trigger"
						src={ this.expanded_src }
						></img>
				</div>
				{ this.props.children }
			</div>
		);
	}

	componentDidMount ()
	{
		ReactDOM.findDOMNode( this ).addEventListener( 'click', ( event ) =>
		{
			let thisElement = event.target;
			let elemsText = event.currentTarget.querySelectorAll( ".collapsable-text" );
			let elemIcon = thisElement;

			if( thisElement.classList.contains( "collapse-trigger" ) )
			{
				if ( this.isCollapsed )
				{
					for( let idxElemText = 0; idxElemText < elemsText.length; idxElemText++ )
					{
						elemsText[ idxElemText ].classList.remove( "hidden" );
					}
					elemIcon.src = this.collapsed_src;
				}
				else
				{
					for( let idxElemText = 0; idxElemText < elemsText.length; idxElemText++ )
					{
						elemsText[ idxElemText ].classList.add( "hidden" );
					}
					elemIcon.src = this.expanded_src;
				}
				this.isCollapsed = !this.isCollapsed;
			}
		} );
	}
}