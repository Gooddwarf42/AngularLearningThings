import { CanDeactivateFn } from '@angular/router';
import { HasPendingChanges } from './has-pending-changes';

export const leaveFormWithPendingChangesGuard: CanDeactivateFn<HasPendingChanges> = (component, currentRoute, currentState, nextState) => {
  let confirmValue = true;
    if (component.HasPendingChanges()) {
      confirmValue = confirm("Dati non salvati, vuoi uscire?");
    }

    return confirmValue;
};
