--- Relaciones ---
/*
Catálogo de Relaciones 
Aquí se define con que se relaciona el docuemento, para que sirve, o que avala como: (Persona, Operacio, Vin, Crédito...)
*/

CREATE TABLE [dbo].[Rel_Docto_Oblig]( 
[Cat_TipoDoctoId] int NOT NULL,		-- ID de Cat_TipoDocto
[Cat_DoctoId] int NOT NULL,		-- ID de Cat_TipoDocto
[Cat_ObligatoriedadID] int NOT NULL,	-- ID de la obligatoriedad
[TablaDatosEx] varchar(100) NULL,-- Tabla de datos Extra (esta tabla deberá contener ID de la relación)

CONSTRAINT [PK_Rel_Documentos] PRIMARY KEY CLUSTERED  
( 
[Cat_TipoDoctoId],[Cat_DoctoId],[Cat_ObligatoriedadID] ASC 
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY] 
) ON [PRIMARY] 


/*
*/

CREATE TABLE [dbo].[Cat_Obligatoriedad]( 
[Cat_ObligatoriedadID] int NOT NULL,	-- ID de la obligatoriedad
[PersonalidadID] Varchar(2) NULL,	-- A=Ambas,F=Fisica,M=Moral,FA=Fisica con Act Empresaria, N=No Aplica
[Maximo] int NULL,					-- 0= No aplica
[Minimo] int NULL,					-- 0= No aplica
[Caducidad] varchar(2) NULL,		-- F=Fecha,D=dias,N= No aplica

 CONSTRAINT [PK_Rel_Constr] PRIMARY KEY CLUSTERED  
( 
[Cat_ObligatoriedadID] ASC 
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY] 
) ON [PRIMARY] 

/*
Valores de realaciones
*/



CREATE TABLE [dbo].[Rel_Docto_Unidad]( 
[Cat_TipoDoctoId] int NOT NULL,				-- ID de Cat_TipoDocto
[Cat_DoctoId] int NOT NULL,				-- ID de Cat_TipoDocto
[Cat_ArchivoID] uniqueidentifier NOT NULL,			-- ID del documento
[Version]  int NOT NULL,			-- Versión del documento
[UnidadId] int  NULL, 
[Vin] varchar(50) NULL				-- VIN de la unidad
 CONSTRAINT [PK_Rel_Docto_Unidad] PRIMARY KEY CLUSTERED  
( 
[Cat_TipoDoctoId],[Cat_DoctoId],[Cat_ArchivoID],[Version] ASC 
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY] 
) ON [PRIMARY] 
  