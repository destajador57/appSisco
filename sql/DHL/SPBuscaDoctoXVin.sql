USE [MIAUTODHL]
GO
/****** Object:  StoredProcedure [dbo].[APP_DHL_GET_VIN]    Script Date: 23/2/2018 15:55:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<joseetmanuel@gmail.com,,José Etmanuel>
-- Create date: <21 Febrero 2018>
-- Description:	<Busca los documentos de acuerdo al VIN o la placa>
-- =============================================
-- 

CREATE PROCEDURE [dbo].[APP_DHL_GET_DOCTOS] 
	@Vin Varchar(20)='' -- 1) App mobil, 2 App Web
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @VinPlaca varchar(20) = '';
	if Exists ( Select * from Ope_Unidad where vin = @Vin)
		Begin 
			SET @VinPlaca = (Select vin from Ope_Unidad where vin = @Vin);
		end
	else 
		Begin
			if Exists ( Select * from Ope_Unidad where placas = @Vin)
				Begin 
					SET @VinPlaca = (Select * from Ope_Unidad where placas = @Vin):
				end
		end
	
END
