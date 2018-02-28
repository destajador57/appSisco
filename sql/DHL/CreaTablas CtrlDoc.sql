/* 
Cat�logo de tipo de documentos
Contiene una abstracci�n de que es el documento como: Identificaci�n, Comprobante de Domicilio
*/
CREATE TABLE [dbo].[Cat_TipoDocto]( 
[Cat_TipoDoctoId] int NOT NULL IDENTITY(1,1),	-- ID
[TipoDocto] varchar(100) NOT NULL,				-- Nombre
CONSTRAINT [PK_Cat_TipoDocto] PRIMARY KEY CLUSTERED  
( 
[Cat_TipoDoctoId] ASC 
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY] 
) ON [PRIMARY] 

/*
Cat�logo de documentos
Es el documento que fue de un tipo por ejemplo: Para una identificaci�n ser�a INE
*/
CREATE TABLE [dbo].[Cat_Docto]( 
[Cat_TipoDoctoId] int NOT NULL,	-- ID de Cat_TipoDocto
[Cat_DoctoId] int NOT NULL,		-- ID de Documentos
[Docto] varchar(100) NOT NULL,	-- Nombre
 CONSTRAINT [PK_Cat_Docto] PRIMARY KEY CLUSTERED  
( 
[Cat_TipoDoctoId],[Cat_DoctoId] ASC 
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY] 
) ON [PRIMARY] 


/*
Cat�logo de Archivos
Es el documento Digital y en su caso Fisico
*/
CREATE TABLE [dbo].[Cat_Archivo]( 
[Cat_TipoDoctoId] int NOT NULL,			-- ID de Cat_TipoDocto
[Cat_DoctoId] int NOT NULL,				-- ID de Cat_Docto
[Cat_ArchivoId] uniqueidentifier NOT NULL DEFAULT newid(), -- ID de Cat_Docto
[Version] int NOT NULL,					-- Versi�n del Archivo
[Cat_StatusDoctoId] smallint NOT NULL,	-- Status del Archivo
[Fecha] DateTime  NULL,					-- Fecha del documento
[Identificador] varchar(max) NOT NULL,	-- N�mero o caracteres que identifican el documento
[Obserbaciones] varchar(max) NULL,		-- Datos extra
[Ruta] varchar(max)  NOT NULL,			-- Direcci�n virtual donde se puede recuperar el archivo
[Extencion] varchar(max)  NOT NULL,		-- Extenci�n del tipo de archivo virtual
[Cat_OficinaID] int NULL,				-- Clave de la oficiana fisica que lo resguarda
[Estante] varchar(max) NOT NULL,		-- Identificador del estante fisico que lo resguarda
[Cajon] varchar(max) NOT NULL,			-- Identificador del caj�n fisico que lo resguarda
 CONSTRAINT [PK_Cat_Archivo] PRIMARY KEY CLUSTERED  
( 
[Cat_TipoDoctoId],[Cat_DoctoId],[Version] ASC 
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY] 
) ON [PRIMARY] 

