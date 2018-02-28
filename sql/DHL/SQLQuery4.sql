SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<joseetmanuel@gmail.com,,José Etmanuel>
-- Create date: <21 Febrero 2018>
-- Description:	<Valida Login>
-- =============================================
-- ValidaLogin 1, 'Usuario','123'

CREATE PROCEDURE APP_DHL_VALIDA_LOGIN 
	@App Int=1, -- 1) App mobil, 2 App Web
	@Usuario varchar(100) ='',
	@Password varchar(100) =''
AS
BEGIN
	SET NOCOUNT ON;
	if Exists ( Select * from Seg_Usuarios where TipoUsuarioId = @App and nombreUsuario = @Usuario and contrasenia = @Password )
		Begin 
			select '1' as ok;
		end
	else 
		Begin
			select '0' as ok;
		end
END
GO
