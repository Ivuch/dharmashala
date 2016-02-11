import java.util.Arrays;

/*
las imágenes son representadas con matrices de números 
 enteros que representan la altura sobre el nivel del mar en metros en una 
 posición determinada. Consideraremos a un estrato como a un conjunto conexo
  de posiciones de la matriz con misma altura. Para que una parte de la imágen se considere 
el borde de una montaña debe ser un estrato mínimo local. Esto quiere decir
 que es un estrato y que no posee ningún estrato vecino con altura menor. 
 Diseñar un algoritmo que dada una matriz, devuelva una matriz con 0 en todas
  sus posiciones excepto en los bordes de las montañas que encuentre.

*/
// Para testear tu código en nuestros servidores debes mantener la estructura expuesta abajo.
// Eres libre de crear nuevas funciones/procedimientos.
// Recuerda que el código que escribas podrá ser visto por las empresas a las que te postules.
class Functions
{
	
	/*
	 * The Boolean variables v1-v8 represents the following diagram with center in Cn:
	 * 
	 * v1 v2 v5
	 * v3 Cn v6
	 * v4 v7 v8
	 * 
	 */
  // int[][] relieve = { {9, 9, 2, 2, 3, 5}, {9, 8, 3, 2, 4, 5}, {9, 7, 2, 2, 4, 3}, {9, 9, 2, 4, 4, 3}, {9, 2, 3, 4, 3, 5}};
  public int[][] encontrar_bordes(int[][] relieve)
  {
  	int initHeight = relieve[0][0]; 
  	boolean isEstrato = false;
  	for(int i = 0; i<relieve.length; i++){
  		for (int j =0; j<relieve[i].length; j++){
  			initHeight = relieve[i][j];
  			int auxJ = j+1;
  			int auxI = i+1;
  			int auxJm = j-1;
  			int auxIm = i-1;
  			
  			if(auxIm >= 0){
  				if(auxJm >= 0){
  					if(relieve[auxI][auxJ] == initHeight){
  						Boolean v1 = true;
  					}
  					if(relieve[i][auxJm] == initHeight){
  						Boolean v2 = true;
  					}
  				}
  				if(relieve[auxIm][j] == initHeight){
  					Boolean v3 = true;
  				}
  				if(auxJ < relieve[i].length){
  					if(relieve[auxIm][auxJ] == initHeight){
  						Boolean v4 = true;
  					}
  				}
  			}
  			
  			if(auxJ < relieve[i].length){
	  			if(relieve[i][auxJ] == initHeight){
	  				boolean rightBorder = true;
	  			}
	  			if(auxI <relieve.length){
	  				if(relieve[auxI][auxJ] == initHeight){
	  					boolean diagDownRight = true;
	  				}
	  				if(relieve[auxI][j] == initHeight){
	  					boolean downBoder = true;
	  				}
	  			}
  			}
  			
  		}
  	}
    // int[][] array = { {0, 0, 0, 0, 0, 1}, {0, 0, 0, 0, 0, 0}, {0, 0, 1, 0, 0, 0}, {0, 0, 0, 0, 0, 0}, {0, 0, 1, 0, 0, 0 }};
    // return array;
	return relieve;

  }
}

//La función main() será ejecutada en nuestros servidores llamando a la expuesta arriba.