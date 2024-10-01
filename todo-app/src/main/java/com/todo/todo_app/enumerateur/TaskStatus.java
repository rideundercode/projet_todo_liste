package com.todo.todo_app.enumerateur;


public enum TaskStatus {
    TO_DO("À faire"),
    IN_PROGRESS("En cours"),
    DONE("Terminé"),
    BLOCKED("Bloqué");

    private final String displayName;

    TaskStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
