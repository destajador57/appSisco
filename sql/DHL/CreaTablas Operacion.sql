USE [MIAUTODHL]
GO

/****** Object:  Table [dbo].[Unidades]    Script Date: 23/2/2018 11:31:00 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Ope_Unidad](
	[UnidadId] [int] IDENTITY(1,1) NOT NULL,
	
	[vin] [varchar](50) NULL,
	[placas] [varchar](50) NULL,
	[modelo] [varchar](10) NULL,
	[marca] [varchar](50) NULL,
	[submarca] [varchar](50) NULL,

	[fecha] [datetime] NULL,
	[statusID]  [int] NULL,
	[accionId]  [int] NULL,
	
	[gps] [varchar](200) NULL,
	[combustible] [varchar](50) NULL,

	[ZonaId] [int] NULL,
	[idOperacion] [int] NULL,
	[idCentroTrabajo] [int] NULL,
	[numeroEconomico] [nvarchar](50) NULL,
	
	
 CONSTRAINT [PK_Ope_Unidad] PRIMARY KEY CLUSTERED 
(
	[UnidadId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Unidades Comentarios]    Script Date: 23/2/2018 11:31:00 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Ope_UnidadComet](
	[UnidadCometId] [int] IDENTITY(1,1) NOT NULL,
	[UnidadId] [int] NOT NULL,
	[Comentario] [varchar](max) NULL,
	[Fecha][DateTime] NULL,
	[UsuarioId] int
 CONSTRAINT [PK_Ope_UnidadComet] PRIMARY KEY CLUSTERED 
(
	[UnidadCometId],[UnidadId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


CREATE TABLE [dbo].[Cat_Acciones](
	[AccionesId] [int] IDENTITY(1,1) NOT NULL,
	[NombreAccion] [varchar](max) NULL,
 CONSTRAINT [PK_Cat_Acciones] PRIMARY KEY CLUSTERED 
(
	[AccionesId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


CREATE TABLE [dbo].[Cat_Status](
	[StatusId] [int] IDENTITY(1,1) NOT NULL,
	[NombreStatus] [varchar](max) NULL,
 CONSTRAINT [PK_Cat_Status] PRIMARY KEY CLUSTERED 
(
	[StatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

