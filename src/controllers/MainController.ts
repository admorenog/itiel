import Controller from '../../core/system/controllers/Controller'
import Graph from '../models/Graph'

export default class MainController extends Controller
{
	public index ()
	{
		let window = {
			width: 800, height: 600, show: false, transparent: false,
			opacity: 0, title: "Itiel",
			webPreferences: { nodeIntegration: false, contextIsolation: true, webSecurity : false },
			onReady: ( event : Event ) =>
			{
				kernel.windows.get( "main" ).show();

				//showSlowly( "load/loader", 0 );
					showSlowly( "main", 0 );

				setTimeout( function ()
				{
					//kernel.windows.get( "load/loader" ).hide();
					//kernel.windows.get( "main" ).show();
					//showSlowly( "main", 0 );
				}, 2000 );

				function showSlowly ( view : string, opacity : number )
				{
					opacity += 0.01
					kernel.windows.get( view ).setOpacity( opacity );
					if ( opacity < 1 )
					{
						setTimeout( () =>
						{
							showSlowly( view, opacity );
						}, 5 );
					}
				}
			}
		};
		view( window, 'main', { } );
	}
}