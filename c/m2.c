 #include <stdio.h>

int main(){
    int bt[20], wt[20], tat[20], i,j,n;
    float awt = 0.0, atat = 0.0;
    
    printf("Enter the number of process: ");
    scanf("%d",&n);
    
    printf("Enter the burst time for each process: \n");
    for(i = 0; i<n; i++){
        printf("P%d:", i+1);
        scanf("%d",&bt[i]);
    }
    
    wt[0] = 0;
    
    for(i = 1; i < n; i++){
        wt[i] = 0;
        for(j = 0; j < i; j++){
            wt[i] += bt[j];
        }
        awt += wt[i];
    }
    
    printf("PROCESS\tBURST_TIME\tWAITING_TIME\tTURNAROUND_TIME\n");
    for(i = 0; i < n; i++){
        tat[i] = wt[i] + bt[i];
        atat += tat[i];
        
        printf("P%d\t\t\t%d\t\t\t%d\t\t\t%d\n", i+1, bt[i], wt[i], tat[i]);
    }
    
    printf("\n Average Waiting time = %.2f ", awt/n);
    printf("\n Average Turnaround time = %.2f ", atat/n);
    
    return 0;
    
    
}