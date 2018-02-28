USE [MIAUTODHL]
GO

/****** ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Seg_Usuarios](
	[UsuarioId] int IDENTITY(1,1) NOT NULL,
	[TipoUsuarioId] int  NOT NULL,
	[nombreUsuario] [varchar](50) NULL,
	[contrasenia] [varchar](50) NULL,
	[nombreCompleto] [nvarchar](50) NULL,
	[correoElectronico] [nvarchar](100) NULL,
	[empresaId] [varchar](50) NULL,
 CONSTRAINT [PK_Seg_Usuarios] PRIMARY KEY CLUSTERED 
(
	[UsuarioId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Seg_Perfiles](
	[PerfilId] int IDENTITY(1,1) NOT NULL,
	[nombrePerfil] [varchar](50) NULL,
 CONSTRAINT [PK_Seg_Perfiles] PRIMARY KEY CLUSTERED 
(
	[PerfilId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Seg_PerfilesPermiso](
	[PerfilId] int NOT NULL,
	[UsuarioId] int NOT NULL,
	[Table]  varchar(100) NOT NULL,
	[Columna]  varchar(100) NOT NULL,
	[Permiso]  varchar(1) NOT NULL,
 CONSTRAINT [PK_Seg_PerfilesPermiso] PRIMARY KEY CLUSTERED 
(
	[PerfilId],[UsuarioId],[Table],[Columna] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Seg_TipoUsuario](
	[TipoUsuarioId] int IDENTITY(1,1) NOT NULL,
	[nombreTipoUsuario] [varchar](50) NULL,
 CONSTRAINT [PK_Seg_TipoUsuario] PRIMARY KEY CLUSTERED 
(
	[TipoUsuarioId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO