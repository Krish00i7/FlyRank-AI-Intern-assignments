#include <stdio.h>
#include <string.h>

int main()
{
    char s[21][21], chng[20];
    int wt[21], a[21], n, i, j, temp, tr[21];
    float tot = 0.0, at = 0.0;

    printf("\nShortest Job First Algorithm");
    printf("\nEnter the number of processes: ");
    scanf("%d", &n);
    printf("Enter Burst Time for each process\n");
    for (i = 0; i < n; i++)
    {
        sprintf(s[i], "P%d", i + 1);
        printf("%s: ", s[i]);
        scanf("%d", &a[i]);
    }
    for (i = 0; i < n - 1; i++)
    {
        for (j = i + 1; j < n; j++)
        {
            if (a[i] > a[j])
            {
                temp = a[i];
                a[i] = a[j];
                a[j] = temp;
                strcpy(chng, s[i]);
                strcpy(s[i], s[j]);
                strcpy(s[j], chng);
            }
        }
    }
    
    wt[0] = 0;
    tr[0] = a[0];
    printf("\nProcess\tBurst Time\tWaiting Time\tTurnaroundTime");
    printf("\n..................................................\n");
    for (i = 0; i < n; i++)
    {
        if (i > 0)
        {
            wt[i] = wt[i - 1] + a[i - 1];
            tr[i] = wt[i] + a[i];
        }
        printf("%s\t%d\t\t%d\t\t%d\n", s[i], a[i], wt[i], tr[i]);
        tot += wt[i];
        at += tr[i];
    }
    printf("\nAverage Waiting Time = %.2f\n", tot / n);
    printf("Average Turnaround Time = %.2f\n", at / n);

    return 0;
}


