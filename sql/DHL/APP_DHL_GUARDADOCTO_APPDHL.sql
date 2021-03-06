USE [MIAUTODHL]
GO
/****** Object:  StoredProcedure [dbo].[APP_DHL_GUARDADOCTO_APPDHL]    Script Date: 26/2/2018 19:05:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<joseetmanuel@gmail.com,,José Etmanuel>
-- Create date: <21 Febrero 2018>
-- Description:	<>
-- =============================================
-- ValidaLogin 1, 'Usuario','123'

ALTER PROCEDURE [dbo].[APP_DHL_GUARDADOCTO_APPDHL]
	@DoctoId Varchar(20)='',
	@Extencion VARCHAR(10) ='JPG',
	@Vin Varchar(20)='', 
	@Valor Varchar(max)=''
AS
BEGIN
	
	SET NOCOUNT ON;
	DECLARE @TipoDoctoID int = 10, -- El típo de docto es 10 para esta base de datos 
			@Version int = 0, -- Necesito ver si lo voy a reescribir 
			@ArchivoId uniqueidentifier;
	;

	if exists (select Cat_ArchivoID from Rel_Docto_Unidad where Cat_TipoDoctoId=@TipoDoctoID and Cat_DoctoId=@DoctoId and Vin = @Vin)
		begin 
			SET @ArchivoId = (select Cat_ArchivoID from Rel_Docto_Unidad where Cat_TipoDoctoId=@TipoDoctoID and Cat_DoctoId=@DoctoId and Vin = @Vin);
			SET @Version = (select [Version] from Rel_Docto_Unidad where Cat_TipoDoctoId=@TipoDoctoID and Cat_DoctoId=@DoctoId and Vin = @Vin) ;
		end
	else
		begin 
			SET @ArchivoId = newid();
		end

	INSERT INTO [dbo].[Cat_Archivo]
			   ([Cat_TipoDoctoId]
			   ,[Cat_DoctoId]
			   ,[Cat_ArchivoId]
			   ,[Version]
			   ,[Cat_StatusDoctoId]
			   ,[Fecha]
			   ,[Identificador]
			   ,[Obserbaciones]
			   ,[Ruta]
			   ,[Extencion]
			   ,[Estante]
			   ,[Cajon]
			   )
		 VALUES(
			   @TipoDoctoID,
			   @DoctoId,
			   @ArchivoId,
			   (@Version + 1),
			   1,
			   SYSDATETIME(),
			   @Valor,
			   @Vin,
			   '/uploads/'+@Vin+CONVERT(varchar(10),@TipoDoctoID)+CONVERT(varchar(10),@DoctoId),
			   @Extencion,
			   '',
			   ''
			   )
	;
	select @ArchivoId as ArchivoId

	
END

