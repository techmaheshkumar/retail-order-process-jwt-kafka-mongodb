import { MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

export default class SnackBar {
    static getSnackBarConfig(): any {
        const config = new MatSnackBarConfig();
        const horizontalPosition: MatSnackBarHorizontalPosition = 'right';
        const verticalPosition: MatSnackBarVerticalPosition = 'top';
        config.verticalPosition = verticalPosition;
        config.horizontalPosition = horizontalPosition;
        config.duration = 3000;
        config.panelClass = 'snackbar-bg';
        return config;
    }
}
