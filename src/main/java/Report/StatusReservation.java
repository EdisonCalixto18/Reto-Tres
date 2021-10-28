/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Report;

/**
 *
 * @author HALCO
 */
public class StatusReservation {
    
    
    private int completed;
    private int Canceled;

    public StatusReservation(int completed, int Canceled) {
        this.completed = completed;
        this.Canceled = Canceled;
    }

    public int getCompleted() {
        return completed;
    }

    public void setCompleted(int completed) {
        this.completed = completed;
    }

    public int getCanceled() {
        return Canceled;
    }

    public void setCanceled(int Canceled) {
        this.Canceled = Canceled;
    }
    
    
    
}
