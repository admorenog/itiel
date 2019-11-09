import React from 'react';

import Module from './Module'

export default class Workflow extends React.Component
{
	constructor ( props )
	{
		super( props );
		this.state = { modules : { } };
	}

	render ()
	{
		let modules = Object.keys( this.state.modules ).map( key => {
			let item = this.state.modules[ key ];
			return (<Module
				key={ key + ( new Date() ) }
				name={ item.name }
				type={ item.type }
				x={ item.x }
				y={ item.y }
			/>);
		} );
		return (
			<div className="workflow">
				{ modules }
			</div>
		);
	}

	componentDidMount()
	{
		document.addEventListener( "drop", ( event ) => {
			event.preventDefault();
			debugger;
			if( event.target.matches( ".workflow" ) )
			{
				console.log( event );
				event.stopPropagation();
				var name = event.dataTransfer.getData( "name" );
				var type = event.dataTransfer.getData( "type" );
				var origin = event.dataTransfer.getData( "origin" );

				debugger;

				let modules = this.state.modules;
				let module = null;

				let modulePosition = this.getModulePosition( event.x, event.y );

				if( origin == "item-tree" )
				{
					name = this.getModuleName( type );
				}

				module = {
					name : name,
					type : type,
					x : modulePosition.x,
					y : modulePosition.y
				};

				modules[ name ] = module;
				// event.dataTransfer.setData( "origin", "workflow" );
				// event.dataTransfer.setData( "identifier", name );

				this.setState( {...this.state, modules } );
			}
		} );
	}

	getModuleName( type )
	{
		let nameOfModules = Object.keys( this.state.modules );
		let name = this.getAvailableModuleName( nameOfModules, type, 0 );
		return name;
	}

	getAvailableModuleName( nameOfModules, type, secuential )
	{
		if( secuential == 0 )
		{
			name = type;
		}
		else
		{
			name = type + secuential;
		}
		if( nameOfModules.indexOf( name ) != -1 )
		{
			name = this.getAvailableModuleName( nameOfModules, type, secuential + 1 );
		}
		return name;
	}

	getModulePosition( xEvent, yEvent )
	{
		let modulePosition = { x : xEvent, y : yEvent };
		let moduleSize = { w : 50, h : 80}
		let gridSize = { w : 10, h : 10 };
		// Centering the module on the mouse pointer
		modulePosition.x -= moduleSize.w / 2;
		modulePosition.y -= moduleSize.h / 2;

		// We should avoid overlapping;
		modulePosition = this.getFreeSpace( modulePosition, moduleSize );

		// Align to the grid
		modulePosition.x = modulePosition.x + ( gridSize.w - ( modulePosition.x % gridSize.w ) );
		modulePosition.y = modulePosition.y + ( gridSize.h - ( modulePosition.y % gridSize.h ) );

		return modulePosition;
	}

	getFreeSpace( modulePosition, moduleSize )
	{
		let modules = this.state.modules;

		for( let idxModule in modules )
		{
			if( modulePosition.x > modules[ idxModule ].x - moduleSize.w &&
				modulePosition.x < modules[ idxModule ].x + moduleSize.w &&
				modulePosition.y > modules[ idxModule ].y - moduleSize.h &&
				modulePosition.y < modules[ idxModule ].y + moduleSize.h
			)
			{
				// console.log( "antes", modulePosition, "colisiona con", modules[ idxModule ].x );
				modulePosition.x = modules[ idxModule ].x + moduleSize.w + 10;
				// console.log( "después", modulePosition, modules[ idxModule ].x, moduleSize.w );
				modulePosition = this.getFreeSpace( modulePosition, moduleSize );
			}
		}
		return modulePosition;
	}

}