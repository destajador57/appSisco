USE [MIAUTODHL]
GO
/****** Object:  StoredProcedure [dbo].[APP_DHL_GET_VIN]    Script Date: 26/2/2018 18:21:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<joseetmanuel@gmail.com,,José Etmanuel>
-- Create date: <21 Febrero 2018>
-- Description:	
-- =============================================
-- ValidaLogin 1, 'Usuario','123'

CREATE PROCEDURE [dbo].[APP_DHL_GET_DOCTOS] 
	@Cat_TipoDoctoId INT = 10, -- 10 SON LOS DOCTOS VEHICULARES
	@Vin Varchar(20)='' 
AS
BEGIN
	SET NOCOUNT ON;
	IF EXISTS (SELECT * FROM REL_DOCTO_UNIDAD as r inner join cat_archivo as c on  r.Cat_TipoDoctoId=c.Cat_TipoDoctoId and r.Cat_DoctoId=c.Cat_DoctoId and r.Cat_ArchivoID=c.Cat_ArchivoID and r.[Version]=c.[Version] where r.Cat_TipoDoctoId = 10 and Vin = @Vin)
		Begin 
			Select 1 as 'ok';
		end
	else
		Begin
			Select 0 as 'ok';
		end
END
