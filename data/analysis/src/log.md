



lme = 





**Linear mixed-effects model fit by ML**



**Model information:**

    Number of observations             190

    Fixed effects coefficients           4

    Random effects coefficients         12

    Covariance parameters                2



**Formula:**

    rr ~ 1 + design + (1 | id)



**Model fit statistics:**

    AIC       BIC       LogLikelihood    Deviance

    285.38    304.86    -136.69          273.38  



**Fixed effects coefficients (95% CIs):**

    Name                 Estimate    SE          tStat      DF     pValue    

    '(Intercept)'         -2.0193    0.087995    -22.948    186    3.8108e-56

    'design_db'          -0.40609    0.098119    -4.1387    186    5.2881e-05

    'design_gb'          -0.12267    0.098611     -1.244    186       0.21506

    'design_rb'          -0.20005    0.098119    -2.0389    186      0.042878





    Lower       Upper     

     -2.1929       -1.8457

    -0.59966      -0.21252

    -0.31721      0.071865

    -0.39362    -0.0064824



**Random effects covariance parameters (95% CIs):**

Group: id (12 Levels)

    Name1                Name2                Type         Estimate    Lower  

    '(Intercept)'        '(Intercept)'        'std'        0.18579     0.10529





    Upper  

    0.32783



Group: Error

    Name             Estimate    Lower      Upper  

    'Res Std'        0.47803     0.43088    0.53035





ans = 





    **ANOVA marginal tests: DFMethod = 'Residual'**



    Term                 FStat     DF1    DF2    pValue    

    '(Intercept)'        526.61    1      186    3.8108e-56

    'design'             6.0465    3      186    0.00059743





lmeAlt = 





**Linear mixed-effects model fit by ML**



**Model information:**

    Number of observations             190

    Fixed effects coefficients          16

    Random effects coefficients         12

    Covariance parameters                2



**Formula:**

    rr ~ 1 + design*question + (1 | id)



**Model fit statistics:**

    AIC      BIC       LogLikelihood    Deviance

    262.9    321.34    -113.45          226.9   



**Fixed effects coefficients (95% CIs):**

    Name                          Estimate     SE         tStat       DF 

    '(Intercept)'                   -1.8064    0.13344     -13.537    174

    'design_db'                    -0.38225    0.17129     -2.2316    174

    'design_gb'                    -0.35468    0.17534     -2.0228    174

    'design_rb'                   -0.069088    0.17129    -0.40334    174

    'question_2'                   -0.29189    0.17534     -1.6647    174

    'question_3'                  -0.080058    0.17129    -0.46738    174

    'question_4'                   -0.48597    0.17129     -2.8371    174

    'design_db:question_2'          0.30097    0.24512      1.2278    174

    'design_gb:question_2'          0.32433    0.24826      1.3064    174

    'design_rb:question_2'         -0.17701    0.24512    -0.72212    174

    'design_db:question_3'         -0.26719    0.24224      -1.103    174

    'design_gb:question_3'        -0.074769    0.24512    -0.30503    174

    'design_rb:question_3'         -0.64557    0.24224      -2.665    174

    'design_db:question_4'         -0.12289    0.24224     -0.5073    174

    'design_gb:question_4'          0.68345    0.24512      2.7882    174

    'design_rb:question_4'          0.30495    0.24224      1.2589    174





    pValue        Lower       Upper     

    5.5472e-29     -2.0698        -1.543

      0.026917    -0.72033      -0.04418

      0.044628    -0.70075    -0.0086058

       0.68719    -0.40716       0.26898

      0.097776    -0.63796      0.054183

       0.64081    -0.41813       0.25801

      0.005093    -0.82404       -0.1479

       0.22117    -0.18283       0.78476

       0.19314    -0.16566       0.81432

       0.47119    -0.66081       0.30679

       0.27154     -0.7453       0.21091

       0.76071    -0.55857       0.40903

      0.008423     -1.1237      -0.16747

       0.61259      -0.601       0.35522

     0.0058903     0.19965        1.1672

       0.20976    -0.17315       0.78306



**Random effects covariance parameters (95% CIs):**

Group: id (12 Levels)

    Name1                Name2                Type         Estimate    Lower  

    '(Intercept)'        '(Intercept)'        'std'        0.19403     0.11555





    Upper  

    0.32582



Group: Error

    Name             Estimate    Lower      Upper  

    'Res Std'        0.41957     0.37818    0.46549





ans = 





    **ANOVA marginal tests: DFMethod = 'Residual'**



    Term                     FStat     DF1    DF2    pValue    

    '(Intercept)'            183.24    1      174    5.5472e-29

    'design'                 2.5488    3      174      0.057441

    'question'               3.2546    3      174      0.023049

    'design:question'        4.0123    9      174    0.00011106





ans = 





    **Theoretical Likelihood Ratio Test**



    Model     DF    AIC       BIC       LogLik     LRStat    deltaDF    pValue   

    lme        6    285.38    304.86    -136.69                                  

    lmeAlt    18     262.9    321.34    -113.45    46.485    12         5.722e-06





lme = 





**Linear mixed-effects model fit by ML**



**Model information:**

    Number of observations             190

    Fixed effects coefficients           4

    Random effects coefficients         12

    Covariance parameters                2



**Formula:**

    det ~ 1 + design + (1 | id)



**Model fit statistics:**

    AIC        BIC        LogLikelihood    Deviance

    -662.29    -642.81    337.15           -674.29 



**Fixed effects coefficients (95% CIs):**

    Name                 Estimate     SE           tStat      DF     pValue     

    '(Intercept)'          0.93104     0.017246     53.986    186    1.3848e-115

    'design_db'          -0.011097    0.0075013    -1.4793    186        0.14075

    'design_gb'           0.015143    0.0075381     2.0089    186       0.045996

    'design_rb'           0.010919    0.0075013     1.4556    186        0.14719





    Lower         Upper    

       0.89702      0.96506

     -0.025895    0.0037018

    0.00027198     0.030014

    -0.0038796     0.025718



**Random effects covariance parameters (95% CIs):**

Group: id (12 Levels)

    Name1                Name2                Type         Estimate    Lower   

    '(Intercept)'        '(Intercept)'        'std'        0.056812    0.037687





    Upper   

    0.085645



Group: Error

    Name             Estimate    Lower       Upper   

    'Res Std'        0.036542    0.032937    0.040542





ans = 





    **ANOVA marginal tests: DFMethod = 'Residual'**



    Term                 FStat     DF1    DF2    pValue     

    '(Intercept)'        2914.5    1      186    1.3848e-115

    'design'             4.9438    3      186      0.0025149





lmeAlt = 





**Linear mixed-effects model fit by ML**



**Model information:**

    Number of observations             190

    Fixed effects coefficients          16

    Random effects coefficients         12

    Covariance parameters                2



**Formula:**

    det ~ 1 + design*question + (1 | id)



**Model fit statistics:**

    AIC        BIC        LogLikelihood    Deviance

    -648.08    -589.64    342.04           -684.08 



**Fixed effects coefficients (95% CIs):**

    Name                          Estimate       SE          tStat        DF 

    '(Intercept)'                     0.94265    0.019357       48.698    174

    'design_db'                     -0.022936    0.014514      -1.5803    174

    'design_gb'                      -0.00312    0.014862     -0.20993    174

    'design_rb'                     0.0027146    0.014514      0.18704    174

    'question_2'                   -0.0035299    0.014862     -0.23751    174

    'question_3'                     -0.01338    0.014514      -0.9219    174

    'question_4'                    -0.028868    0.014514       -1.989    174

    'design_db:question_2'          0.0043893    0.020773      0.21129    174

    'design_gb:question_2'           0.020914     0.02105      0.99353    174

    'design_rb:question_2'        -0.00058464    0.020773    -0.028144    174

    'design_db:question_3'          0.0065778    0.020525      0.32047    174

    'design_gb:question_3'          0.0077259    0.020773      0.37191    174

    'design_rb:question_3'          0.0019389    0.020525     0.094466    174

    'design_db:question_4'           0.035705    0.020525       1.7395    174

    'design_gb:question_4'           0.043185    0.020773       2.0789    174

    'design_rb:question_4'           0.030779    0.020525       1.4996    174





    pValue         Lower         Upper      

    2.6403e-103       0.90445        0.98086

        0.11586     -0.051581      0.0057097

        0.83397     -0.032454       0.026213

        0.85185     -0.025931        0.03136

        0.81254     -0.032863       0.025804

        0.35786     -0.042026       0.015265

       0.048266     -0.057513    -0.00022256

        0.83291     -0.036611       0.045389

        0.32183     -0.020632        0.06246

        0.97758     -0.041585       0.040416

          0.749     -0.033933       0.047089

        0.71041     -0.033274       0.048726

        0.92485     -0.038572        0.04245

       0.083709    -0.0048061       0.076215

       0.039095     0.0021852       0.084186

        0.13554    -0.0097319        0.07129



**Random effects covariance parameters (95% CIs):**

Group: id (12 Levels)

    Name1                Name2                Type         Estimate    Lower   

    '(Intercept)'        '(Intercept)'        'std'        0.056855    0.037736





    Upper  

    0.08566



Group: Error

    Name             Estimate    Lower       Upper   

    'Res Std'        0.035551    0.032043    0.039443





ans = 





    **ANOVA marginal tests: DFMethod = 'Residual'**



    Term                     FStat      DF1    DF2    pValue     

    '(Intercept)'             2371.5    1      174    2.6403e-103

    'design'                  1.2858    3      174        0.28085

    'question'                1.5675    3      174        0.19902

    'design:question'        0.78447    9      174          0.631





ans = 





    **Theoretical Likelihood Ratio Test**



    Model     DF    AIC        BIC        LogLik    LRStat    deltaDF    pValue 

    lme        6    -662.29    -642.81    337.15                                

    lmeAlt    18    -648.08    -589.64    342.04    9.7902    12         0.63436





lme = 





**Linear mixed-effects model fit by ML**



**Model information:**

    Number of observations             190

    Fixed effects coefficients           4

    Random effects coefficients         12

    Covariance parameters                2



**Formula:**

    entropy ~ 1 + design + (1 | id)



**Model fit statistics:**

    AIC       BIC       LogLikelihood    Deviance

    187.51    206.99    -87.756          175.51  



**Fixed effects coefficients (95% CIs):**

    Name                 Estimate    SE          tStat     DF     pValue    

    '(Intercept)'          3.1222     0.15286    20.425    186    2.1316e-49

    'design_db'          -0.15147    0.070485    -2.149    186      0.032928

    'design_gb'           0.15196    0.070831    2.1454    186      0.033222

    'design_rb'           0.10229    0.070485    1.4512    186        0.1484





    Lower        Upper    

       2.8206       3.4238

     -0.29052    -0.012418

     0.012222      0.29169

    -0.036762      0.24134



**Random effects covariance parameters (95% CIs):**

Group: id (12 Levels)

    Name1                Name2                Type         Estimate    Lower  

    '(Intercept)'        '(Intercept)'        'std'        0.50026     0.33137





    Upper  

    0.75522



Group: Error

    Name             Estimate    Lower      Upper  

    'Res Std'        0.34336     0.30949    0.38095





ans = 





    **ANOVA marginal tests: DFMethod = 'Residual'**



    Term                 FStat     DF1    DF2    pValue    

    '(Intercept)'        417.18    1      186    2.1316e-49

    'design'             7.2599    3      186     0.0001244





lmeAlt = 





**Linear mixed-effects model fit by ML**



**Model information:**

    Number of observations             190

    Fixed effects coefficients          16

    Random effects coefficients         12

    Covariance parameters                2



**Formula:**

    entropy ~ 1 + design*question + (1 | id)



**Model fit statistics:**

    AIC       BIC       LogLikelihood    Deviance

    196.29    254.74    -80.146          160.29  



**Fixed effects coefficients (95% CIs):**

    Name                          Estimate     SE         tStat        DF 

    '(Intercept)'                    3.1218    0.17295        18.05    174

    'design_db'                    -0.23006    0.13431      -1.7129    174

    'design_gb'                    0.055148    0.13754      0.40096    174

    'design_rb'                     0.12992    0.13431      0.96725    174

    'question_2'                   0.026185    0.13754      0.19038    174

    'question_3'                    0.19213    0.13431       1.4304    174

    'question_4'                   -0.21487    0.13431      -1.5997    174

    'design_db:question_2'          0.12342    0.19224      0.64198    174

    'design_gb:question_2'          0.12743     0.1948      0.65414    174

    'design_rb:question_2'        -0.011188    0.19224    -0.058199    174

    'design_db:question_3'          -0.1167    0.18995     -0.61436    174

    'design_gb:question_3'         -0.18906    0.19224     -0.98343    174

    'design_rb:question_3'         -0.31158    0.18995      -1.6403    174

    'design_db:question_4'          0.30584    0.18995       1.6101    174

    'design_gb:question_4'          0.43861    0.19224       2.2816    174

    'design_rb:question_4'          0.21045    0.18995       1.1079    174





    pValue        Lower        Upper   

    1.0118e-41       2.7804      3.4632

      0.088517     -0.49516    0.035031

       0.68894     -0.21631     0.32661

       0.33476     -0.13518     0.39501

       0.84923     -0.24527     0.29764

       0.15439    -0.072968     0.45722

       0.11147     -0.47996    0.050229

       0.52173     -0.25601     0.50284

       0.51389     -0.25705      0.5119

       0.95366     -0.39062     0.36824

       0.53978      -0.4916      0.2582

       0.32676     -0.56848     0.19037

       0.10274     -0.68648    0.063323

       0.10919    -0.069061     0.68074

      0.023726     0.059187     0.81804

       0.26942     -0.16445     0.58535



**Random effects covariance parameters (95% CIs):**

Group: id (12 Levels)

    Name1                Name2                Type         Estimate    Lower

    '(Intercept)'        '(Intercept)'        'std'        0.50071     0.332





    Upper  

    0.75516



Group: Error

    Name             Estimate    Lower      Upper  

    'Res Std'        0.329       0.29654    0.36501





ans = 





    **ANOVA marginal tests: DFMethod = 'Residual'**



    Term                     FStat     DF1    DF2    pValue    

    '(Intercept)'             325.8    1      174    1.0118e-41

    'design'                 2.6586    3      174      0.049867

    'question'               3.0932    3      174      0.028419

    'design:question'        1.5766    9      174        0.1255





ans = 





    **Theoretical Likelihood Ratio Test**



    Model     DF    AIC       BIC       LogLik     LRStat    deltaDF    pValue 

    lme        6    187.51    206.99    -87.756                                

    lmeAlt    18    196.29    254.74    -80.146    15.221    12         0.22957





lme = 





**Linear mixed-effects model fit by ML**



**Model information:**

    Number of observations             190

    Fixed effects coefficients           4

    Random effects coefficients         12

    Covariance parameters                2



**Formula:**

    l ~ 1 + design + (1 | id)



**Model fit statistics:**

    AIC       BIC       LogLikelihood    Deviance

    1194.7    1214.2    -591.36          1182.7  



**Fixed effects coefficients (95% CIs):**

    Name                 Estimate    SE        tStat      DF     pValue    

    '(Intercept)'          13.58     1.5942     8.5184    186    5.4047e-15

    'design_db'          -1.7075     1.0219    -1.6709    186      0.096424

    'design_gb'           1.4286     1.0269     1.3911    186       0.16586

    'design_rb'           0.8711     1.0219    0.85243    186       0.39507





    Lower       Upper  

      10.435     16.725

     -3.7235    0.30852

    -0.59737     3.4545

     -1.1449     2.8871



**Random effects covariance parameters (95% CIs):**

Group: id (12 Levels)

    Name1                Name2                Type         Estimate    Lower 

    '(Intercept)'        '(Intercept)'        'std'        4.9155      3.2111





    Upper 

    7.5246



Group: Error

    Name             Estimate    Lower     Upper 

    'Res Std'        4.9783      4.4871    5.5232





ans = 





    **ANOVA marginal tests: DFMethod = 'Residual'**



    Term                 FStat     DF1    DF2    pValue    

    '(Intercept)'        72.563    1      186    5.4047e-15

    'design'             3.6096    3      186      0.014402





lmeAlt = 





**Linear mixed-effects model fit by ML**



**Model information:**

    Number of observations             190

    Fixed effects coefficients          16

    Random effects coefficients         12

    Covariance parameters                2



**Formula:**

    l ~ 1 + design*question + (1 | id)



**Model fit statistics:**

    AIC       BIC       LogLikelihood    Deviance

    1197.6    1256.1    -580.81          1161.6  



**Fixed effects coefficients (95% CIs):**

    Name                          Estimate    SE        tStat       DF     pValue    

    '(Intercept)'                   13.847    1.9651      7.0463    174    4.1193e-11

    'design_db'                    -3.0922    1.9154     -1.6143    174       0.10827

    'design_gb'                   -0.41678    1.9613     -0.2125    174       0.83197

    'design_rb'                    0.44185    1.9154     0.23068    174       0.81783

    'question_2'                   -0.9901    1.9613     -0.5048    174       0.61433

    'question_3'                    2.7817    1.9154      1.4523    174       0.14823

    'question_4'                   -2.9308    1.9154     -1.5301    174       0.12781

    'design_db:question_2'          4.1652    2.7415      1.5193    174        0.1305

    'design_gb:question_2'          2.2064    2.7778      0.7943    174        0.4281

    'design_rb:question_2'          2.9659    2.7415      1.0819    174       0.28081

    'design_db:question_3'         -2.2866    2.7088    -0.84414    174       0.39975

    'design_gb:question_3'         -2.0922    2.7415    -0.76314    174       0.44641

    'design_rb:question_3'         -4.6914    2.7088     -1.7319    174      0.085063

    'design_db:question_4'          3.7318    2.7088      1.3776    174       0.17008

    'design_gb:question_4'          7.1959    2.7415      2.6248    174     0.0094411

    'design_rb:question_4'          3.5143    2.7088      1.2973    174       0.19623





    Lower       Upper  

      9.9684     17.726

     -6.8726    0.68833

     -4.2879     3.4543

     -3.3386     4.2223

     -4.8612      2.881

    -0.99876     6.5622

     -6.7113     0.8497

     -1.2457      9.576

     -3.2761     7.6889

      -2.445     8.3768

      -7.633     3.0598

      -7.503     3.3187

     -10.038    0.65497

     -1.6146     9.0783

      1.7851     12.607

     -1.8321     8.8607



**Random effects covariance parameters (95% CIs):**

Group: id (12 Levels)

    Name1                Name2                Type         Estimate    Lower 

    '(Intercept)'        '(Intercept)'        'std'        4.9324      3.2319





    Upper 

    7.5275



Group: Error

    Name             Estimate    Lower    Upper 

    'Res Std'        4.6919      4.229    5.2054





ans = 





    **ANOVA marginal tests: DFMethod = 'Residual'**



    Term                     FStat     DF1    DF2    pValue    

    '(Intercept)'             49.65    1      174    4.1193e-11

    'design'                 1.3751    3      174       0.25204

    'question'               3.0778    3      174      0.028993

    'design:question'        2.2653    9      174       0.02012





ans = 





    **Theoretical Likelihood Ratio Test**



    Model     DF    AIC       BIC       LogLik     LRStat    deltaDF    pValue  

    lme        6    1194.7    1214.2    -591.36                                 

    lmeAlt    18    1197.6    1256.1    -580.81    21.1      12         0.048938





lme = 





**Linear mixed-effects model fit by ML**



**Model information:**

    Number of observations             190

    Fixed effects coefficients           4

    Random effects coefficients         12

    Covariance parameters                2



**Formula:**

    lmax ~ 1 + design + (1 | id)



**Model fit statistics:**

    AIC       BIC       LogLikelihood    Deviance

    2203.8    2223.3    -1095.9          2191.8  



**Fixed effects coefficients (95% CIs):**

    Name                 Estimate    SE        tStat      DF     pValue    

    '(Intercept)'         171.58     21.476     7.9897    186     1.378e-13

    'design_db'          -55.751     14.608    -3.8164    186    0.00018424

    'design_gb'           36.957      14.68     2.5175    186      0.012664

    'design_rb'          -20.522     14.608    -1.4048    186       0.16174





    Lower      Upper  

     129.22     213.95

     -84.57    -26.932

     7.9962     65.919

    -49.341     8.2973



**Random effects covariance parameters (95% CIs):**

Group: id (12 Levels)

    Name1                Name2                Type         Estimate    Lower 

    '(Intercept)'        '(Intercept)'        'std'        65.113      42.356





    Upper

    100.1



Group: Error

    Name             Estimate    Lower     Upper 

    'Res Std'        71.165      64.144    78.955





ans = 





    **ANOVA marginal tests: DFMethod = 'Residual'**



    Term                 FStat     DF1    DF2    pValue    

    '(Intercept)'        63.836    1      186     1.378e-13

    'design'              14.08    3      186    2.6077e-08





lmeAlt = 





**Linear mixed-effects model fit by ML**



**Model information:**

    Number of observations             190

    Fixed effects coefficients          16

    Random effects coefficients         12

    Covariance parameters                2



**Formula:**

    lmax ~ 1 + design*question + (1 | id)



**Model fit statistics:**

    AIC       BIC       LogLikelihood    Deviance

    2209.5    2267.9    -1086.7          2173.5  



**Fixed effects coefficients (95% CIs):**

    Name                          Estimate    SE        tStat        DF     pValue   

    '(Intercept)'                   186.5     27.133       6.8737    174    1.074e-10

    'design_db'                   -97.833       27.6      -3.5447    174    0.0005049

    'design_gb'                   -2.1495     28.261    -0.076058    174      0.93946

    'design_rb'                   -52.167       27.6      -1.8901    174     0.060405

    'question_2'                  -52.149     28.261      -1.8453    174     0.066694

    'question_3'                   25.167       27.6      0.91184    174      0.36311

    'question_4'                  -36.083       27.6      -1.3074    174      0.19281

    'design_db:question_2'         85.149     39.502       2.1556    174     0.032491

    'design_gb:question_2'         68.132     40.024       1.7023    174     0.090489

    'design_rb:question_2'         77.066     39.502       1.9509    174      0.05267

    'design_db:question_3'         23.583     39.032      0.60421    174      0.54649

    'design_gb:question_3'         32.816     39.502      0.83074    174      0.40726

    'design_rb:question_3'         -18.75     39.032     -0.48038    174      0.63156

    'design_db:question_4'             63     39.032       1.6141    174      0.10833

    'design_gb:question_4'         56.566     39.502        1.432    174      0.15394

    'design_rb:question_4'         71.667     39.032       1.8361    174     0.068049





    Lower       Upper 

      132.95    240.05

     -152.31    -43.36

     -57.927    53.628

     -106.64    2.3067

     -107.93    3.6285

     -29.307     79.64

     -90.557     18.39

      7.1846    163.11

     -10.863    147.13

    -0.89876    155.03

     -53.454    100.62

     -45.149    110.78

     -95.787    58.287

     -14.037    140.04

     -21.399    134.53

     -5.3703     148.7



**Random effects covariance parameters (95% CIs):**

Group: id (12 Levels)

    Name1                Name2                Type         Estimate    Lower 

    '(Intercept)'        '(Intercept)'        'std'        65.296      42.606





    Upper 

    100.07



Group: Error

    Name             Estimate    Lower     Upper 

    'Res Std'        67.605      60.935    75.005





ans = 





    **ANOVA marginal tests: DFMethod = 'Residual'**



    Term                     FStat     DF1    DF2    pValue   

    '(Intercept)'            47.247    1      174    1.074e-10

    'design'                 5.5956    3      174    0.0010966

    'question'                3.099    3      174     0.028208

    'design:question'        1.3566    9      174      0.21135





ans = 





    **Theoretical Likelihood Ratio Test**



    Model     DF    AIC       BIC       LogLik     LRStat    deltaDF    pValue 

    lme        6    2203.8    2223.3    -1095.9                                

    lmeAlt    18    2209.5    2267.9    -1086.7    18.288    12         0.10721





lme = 





**Linear mixed-effects model fit by ML**



**Model information:**

    Number of observations             190

    Fixed effects coefficients           4

    Random effects coefficients         12

    Covariance parameters                2



**Formula:**

    lam ~ 1 + design + (1 | id)



**Model fit statistics:**

    AIC       BIC        LogLikelihood    Deviance

    -863.5    -844.02    437.75           -875.5  



**Fixed effects coefficients (95% CIs):**

    Name                 Estimate      SE           tStat      DF     pValue     

    '(Intercept)'           0.96198    0.0093945      102.4    186    1.6234e-165

    'design_db'          -0.0060876     0.004443    -1.3702    186        0.17228

    'design_gb'           0.0075283    0.0044648     1.6861    186       0.093445

    'design_rb'           0.0062131     0.004443     1.3984    186        0.16365





    Lower         Upper    

       0.94345      0.98051

     -0.014853    0.0026774

    -0.0012799     0.016336

     -0.002552     0.014978



**Random effects covariance parameters (95% CIs):**

Group: id (12 Levels)

    Name1                Name2                Type         Estimate    Lower   

    '(Intercept)'        '(Intercept)'        'std'        0.030648    0.020287





    Upper   

    0.046301



Group: Error

    Name             Estimate    Lower       Upper   

    'Res Std'        0.021644    0.019508    0.024013





ans = 





    **ANOVA marginal tests: DFMethod = 'Residual'**



    Term                 FStat    DF1    DF2    pValue     

    '(Intercept)'        10485    1      186    1.6234e-165

    'design'             3.994    3      186      0.0087119





lmeAlt = 





**Linear mixed-effects model fit by ML**



**Model information:**

    Number of observations             190

    Fixed effects coefficients          16

    Random effects coefficients         12

    Covariance parameters                2



**Formula:**

    lam ~ 1 + design*question + (1 | id)



**Model fit statistics:**

    AIC        BIC        LogLikelihood    Deviance

    -850.99    -792.54    443.5            -886.99 



**Fixed effects coefficients (95% CIs):**

    Name                          Estimate      SE           tStat       DF 

    '(Intercept)'                    0.97143     0.010725      90.576    174

    'design_db'                    -0.012744    0.0085553     -1.4896    174

    'design_gb'                   -0.0057519    0.0087608    -0.65656    174

    'design_rb'                   0.00030504    0.0085553    0.035655    174

    'question_2'                  -0.0054439    0.0087608    -0.62139    174

    'question_3'                   -0.012016    0.0085553     -1.4045    174

    'question_4'                   -0.019994    0.0085553      -2.337    174

    'design_db:question_2'         0.0041302     0.012245     0.33729    174

    'design_gb:question_2'           0.01461     0.012408      1.1775    174

    'design_rb:question_2'         0.0020506     0.012245     0.16746    174

    'design_db:question_3'         0.0045544     0.012099     0.37642    174

    'design_gb:question_3'          0.010213     0.012245     0.83401    174

    'design_rb:question_3'        0.00058459     0.012099    0.048317    174

    'design_db:question_4'          0.017605     0.012099      1.4551    174

    'design_gb:question_4'          0.027645     0.012245      2.2576    174

    'design_rb:question_4'           0.02066     0.012099      1.7076    174





    pValue         Lower         Upper     

    2.5141e-148       0.95026       0.99259

        0.13813      -0.02963     0.0041413

        0.51233     -0.023043      0.011539

         0.9716     -0.016581      0.017191

        0.53515     -0.022735      0.011847

        0.16196     -0.028901     0.0048698

       0.020577     -0.036879    -0.0031083

         0.7363     -0.020038      0.028298

        0.24061    -0.0098796        0.0391

         0.8672     -0.022118      0.026219

        0.70706     -0.019325      0.028434

        0.40542     -0.013956      0.034381

        0.96152     -0.023295      0.024464

        0.14745    -0.0062747      0.041485

       0.025213     0.0034767      0.051813

       0.089497    -0.0032196       0.04454



**Random effects covariance parameters (95% CIs):**

Group: id (12 Levels)

    Name1                Name2                Type         Estimate    Lower   

    '(Intercept)'        '(Intercept)'        'std'        0.030678    0.020323





    Upper   

    0.046309



Group: Error

    Name             Estimate    Lower       Upper  

    'Res Std'        0.020956    0.018889    0.02325





ans = 





    **ANOVA marginal tests: DFMethod = 'Residual'**



    Term                     FStat     DF1    DF2    pValue     

    '(Intercept)'            8203.9    1      174    2.5141e-148

    'design'                 1.0268    3      174        0.38213

    'question'               2.0192    3      174        0.11301

    'design:question'        0.7837    9      174         0.6317





ans = 





    **Theoretical Likelihood Ratio Test**



    Model     DF    AIC        BIC        LogLik    LRStat    deltaDF    pValue

    lme        6     -863.5    -844.02    437.75                               

    lmeAlt    18    -850.99    -792.54     443.5    11.493    12         0.4872





lme = 





**Linear mixed-effects model fit by ML**



**Model information:**

    Number of observations             190

    Fixed effects coefficients           4

    Random effects coefficients         12

    Covariance parameters                2



**Formula:**

    tt ~ 1 + design + (1 | id)



**Model fit statistics:**

    AIC       BIC       LogLikelihood    Deviance

    1255.2    1274.7    -621.62          1243.2  



**Fixed effects coefficients (95% CIs):**

    Name                 Estimate    SE        tStat      DF     pValue    

    '(Intercept)'         18.635     1.9764     9.4287    186    1.6925e-17

    'design_db'          -3.3592      1.193    -2.8157    186     0.0053914

    'design_gb'           1.8125     1.1989     1.5118    186       0.13228

    'design_rb'          0.79574      1.193      0.667    186        0.5056





    Lower      Upper  

     14.736     22.534

    -5.7128    -1.0056

    -0.5527     4.1777

    -1.5579     3.1493



**Random effects covariance parameters (95% CIs):**

Group: id (12 Levels)

    Name1                Name2                Type         Estimate    Lower

    '(Intercept)'        '(Intercept)'        'std'        6.1837      4.054





    Upper 

    9.4322



Group: Error

    Name             Estimate    Lower     Upper

    'Res Std'        5.8119      5.2384    6.448





ans = 





    **ANOVA marginal tests: DFMethod = 'Residual'**



    Term                 FStat     DF1    DF2    pValue    

    '(Intercept)'          88.9    1      186    1.6925e-17

    'design'             7.0915    3      186    0.00015452





lmeAlt = 





**Linear mixed-effects model fit by ML**



**Model information:**

    Number of observations             190

    Fixed effects coefficients          16

    Random effects coefficients         12

    Covariance parameters                2



**Formula:**

    tt ~ 1 + design*question + (1 | id)



**Model fit statistics:**

    AIC       BIC       LogLikelihood    Deviance

    1248.8    1307.3    -606.42          1212.8  



**Fixed effects coefficients (95% CIs):**

    Name                          Estimate    SE        tStat       DF     pValue    

    '(Intercept)'                  19.561     2.3632      8.2774    174    3.1993e-14

    'design_db'                   -5.6708     2.1785      -2.603    174      0.010039

    'design_gb'                   -1.1618     2.2308    -0.52079    174       0.60318

    'design_rb'                   0.94898     2.1785      0.4356    174       0.66366

    'question_2'                  -2.3306     2.2308     -1.0448    174       0.29758

    'question_3'                    3.878     2.1785      1.7801    174      0.076805

    'question_4'                  -5.3857     2.1785     -2.4722    174      0.014391

    'design_db:question_2'         5.6518     3.1181      1.8126    174      0.071618

    'design_gb:question_2'         3.7697     3.1594      1.1931    174       0.23444

    'design_rb:question_2'         2.5436     3.1181     0.81576    174       0.41575

    'design_db:question_3'        -2.6831     3.0809    -0.87087    174       0.38503

    'design_gb:question_3'        -2.5209     3.1181    -0.80848    174       0.41992

    'design_rb:question_3'        -8.0042     3.0809      -2.598    174       0.01018

    'design_db:question_4'         6.4115     3.0809       2.081    174      0.038896

    'design_gb:question_4'         10.595     3.1181      3.3978    174    0.00084201

    'design_rb:question_4'         4.9818     3.0809       1.617    174       0.10769





    Lower       Upper  

      14.897     24.225

     -9.9705     -1.371

     -5.5646     3.2411

     -3.3508     5.2487

     -6.7335     2.0722

    -0.42175     8.1778

     -9.6855     -1.086

    -0.50232     11.806

     -2.4661     10.005

     -3.6105     8.6977

     -8.7638     3.3977

      -8.675     3.6332

     -14.085    -1.9235

     0.33069     12.492

      4.4405     16.749

      -1.099     11.063



**Random effects covariance parameters (95% CIs):**

Group: id (12 Levels)

    Name1                Name2                Type         Estimate    Lower 

    '(Intercept)'        '(Intercept)'        'std'        6.2079      4.0847





    Upper 

    9.4349



Group: Error

    Name             Estimate    Lower     Upper 

    'Res Std'        5.3363      4.8098    5.9204





ans = 





    **ANOVA marginal tests: DFMethod = 'Residual'**



    Term                     FStat     DF1    DF2    pValue    

    '(Intercept)'            68.515    1      174    3.1993e-14

    'design'                 3.6164    3      174      0.014397

    'question'               6.4086    3      174    0.00038363

    'design:question'        3.6228    9      174    0.00036412





ans = 





    **Theoretical Likelihood Ratio Test**



    Model     DF    AIC       BIC       LogLik     LRStat    deltaDF    pValue   

    lme        6    1255.2    1274.7    -621.62                                  

    lmeAlt    18    1248.8    1307.3    -606.42    30.401    12         0.0024295





lme = 





**Linear mixed-effects model fit by ML**



**Model information:**

    Number of observations             190

    Fixed effects coefficients           4

    Random effects coefficients         12

    Covariance parameters                2



**Formula:**

    vmax ~ 1 + design + (1 | id)



**Model fit statistics:**

    AIC       BIC     LogLikelihood    Deviance

    2018.6    2038    -1003.3          2006.6  



**Fixed effects coefficients (95% CIs):**

    Name                 Estimate    SE        tStat      DF     pValue    

    '(Intercept)'         113.48     11.707     9.6932    186    3.0489e-18

    'design_db'          -26.045     9.0651    -2.8731    186     0.0045373

    'design_gb'           16.553     9.1098     1.8171    186      0.070816

    'design_rb'           1.7676     9.0651    0.19499    186       0.84561





    Lower      Upper  

     90.386     136.58

    -43.928    -8.1613

    -1.4187     34.525

    -16.116     19.651



**Random effects covariance parameters (95% CIs):**

Group: id (12 Levels)

    Name1                Name2                Type         Estimate    Lower 

    '(Intercept)'        '(Intercept)'        'std'        33.856      21.738





    Upper 

    52.728



Group: Error

    Name             Estimate    Lower     Upper 

    'Res Std'        44.162      39.804    48.995





ans = 





    **ANOVA marginal tests: DFMethod = 'Residual'**



    Term                 FStat     DF1    DF2    pValue    

    '(Intercept)'        93.959    1      186    3.0489e-18

    'design'             7.6528    3      186    7.5103e-05





lmeAlt = 





**Linear mixed-effects model fit by ML**



**Model information:**

    Number of observations             190

    Fixed effects coefficients          16

    Random effects coefficients         12

    Covariance parameters                2



**Formula:**

    vmax ~ 1 + design*question + (1 | id)



**Model fit statistics:**

    AIC       BIC       LogLikelihood    Deviance

    2018.8    2077.3    -991.42          1982.8  



**Fixed effects coefficients (95% CIs):**

    Name                          Estimate    SE        tStat       DF     pValue    

    '(Intercept)'                  123.58     15.433      8.0077    174    1.6048e-13

    'design_db'                   -54.917     16.871      -3.255    174     0.0013625

    'design_gb'                   -8.6948     17.275    -0.50333    174       0.61537

    'design_rb'                     -13.5     16.871    -0.80018    174        0.4247

    'question_2'                  -32.967     17.275     -1.9084    174      0.057982

    'question_3'                   15.417     16.871     0.91378    174        0.3621

    'question_4'                  -24.917     16.871     -1.4769    174       0.14152

    'design_db:question_2'         47.967     24.147      1.9865    174      0.048546

    'design_gb:question_2'         36.746     24.464       1.502    174       0.13491

    'design_rb:question_2'         48.134     24.147      1.9934    174      0.047778

    'design_db:question_3'         15.667      23.86     0.65662    174       0.51229

    'design_gb:question_3'         11.111     24.147     0.46017    174       0.64597

    'design_rb:question_3'            -32      23.86     -1.3412    174       0.18161

    'design_db:question_4'         53.917      23.86      2.2597    174      0.025077

    'design_gb:question_4'         53.778     24.147      2.2272    174      0.027219

    'design_rb:question_4'             47      23.86      1.9699    174      0.050442





    Lower        Upper  

       93.123     154.04

      -88.215    -21.618

       -42.79       25.4

      -46.799     19.799

      -67.062     1.1273

      -17.882     48.715

      -58.215      8.382

      0.30974     95.625

      -11.539      85.03

      0.47641     95.792

      -31.425     62.758

      -36.546     58.769

      -79.091     15.091

       6.8252     101.01

       6.1203     101.44

    -0.091475     94.091



**Random effects covariance parameters (95% CIs):**

Group: id (12 Levels)

    Name1                Name2                Type         Estimate    Lower 

    '(Intercept)'        '(Intercept)'        'std'        33.916      21.897





    Upper 

    52.531



Group: Error

    Name             Estimate    Lower     Upper

    'Res Std'        41.326      37.249    45.85





ans = 





    **ANOVA marginal tests: DFMethod = 'Residual'**



    Term                     FStat     DF1    DF2    pValue    

    '(Intercept)'            64.124    1      174    1.6048e-13

    'design'                 4.1621    3      174     0.0070715

    'question'               3.3948    3      174      0.019209

    'design:question'        2.2537    9      174       0.02079





ans = 





    **Theoretical Likelihood Ratio Test**



    Model     DF    AIC       BIC       LogLik     LRStat    deltaDF    pValue  

    lme        6    2018.6      2038    -1003.3                                 

    lmeAlt    18    2018.8    2077.3    -991.42    23.731    12         0.022122





lme = 





**Linear mixed-effects model fit by ML**



**Model information:**

    Number of observations             190

    Fixed effects coefficients           4

    Random effects coefficients         12

    Covariance parameters                2



**Formula:**

    dsq ~ 1 + design + (1 | id)



**Model fit statistics:**

    AIC        BIC        LogLikelihood    Deviance

    -300.53    -281.05    156.27           -312.53 



**Fixed effects coefficients (95% CIs):**

    Name                 Estimate     SE          tStat      DF     pValue    

    '(Intercept)'          0.27596     0.02471     11.168    186     1.722e-22

    'design_db'           0.068979     0.02038     3.3847    186    0.00086922

    'design_gb'           0.015819    0.020481    0.77237    186       0.44087

    'design_rb'          0.0034444     0.02038    0.16901    186       0.86597





    Lower        Upper   

      0.22721     0.32471

     0.028773     0.10918

    -0.024585    0.056223

    -0.036761     0.04365



**Random effects covariance parameters (95% CIs):**

Group: id (12 Levels)

    Name1                Name2                Type         Estimate    Lower   

    '(Intercept)'        '(Intercept)'        'std'        0.069336    0.044142





    Upper  

    0.10891



Group: Error

    Name             Estimate    Lower       Upper  

    'Res Std'        0.099283    0.089489    0.11015





ans = 





    **ANOVA marginal tests: DFMethod = 'Residual'**



    Term                 FStat     DF1    DF2    pValue   

    '(Intercept)'        124.72    1      186    1.722e-22

    'design'             4.9694    3      186    0.0024321





lmeAlt = 





**Linear mixed-effects model fit by ML**



**Model information:**

    Number of observations             190

    Fixed effects coefficients          16

    Random effects coefficients         12

    Covariance parameters                2



**Formula:**

    dsq ~ 1 + design*question + (1 | id)



**Model fit statistics:**

    AIC       BIC        LogLikelihood    Deviance

    -313.8    -255.35    174.9            -349.8  



**Fixed effects coefficients (95% CIs):**

    Name                          Estimate      SE          tStat       DF 

    '(Intercept)'                    0.31021    0.032814      9.4537    174

    'design_db'                     0.069014    0.036504      1.8906    174

    'design_gb'                   -0.0027467    0.037376    -0.07349    174

    'design_rb'                    -0.057927    0.036504     -1.5869    174

    'question_2'                   -0.010455    0.037376    -0.27974    174

    'question_3'                   -0.097841    0.036504     -2.6803    174

    'question_4'                   -0.026534    0.036504     -0.7269    174

    'design_db:question_2'         -0.056104    0.052245     -1.0739    174

    'design_gb:question_2'          0.048011    0.052931     0.90705    174

    'design_rb:question_2'          0.063872    0.052245      1.2226    174

    'design_db:question_3'        -0.0087193    0.051624     -0.1689    174

    'design_gb:question_3'          0.017057    0.052245     0.32649    174

    'design_rb:question_3'           0.14442    0.051624      2.7976    174

    'design_db:question_4'          0.062499    0.051624      1.2106    174

    'design_gb:question_4'         0.0085177    0.052245     0.16303    174

    'design_rb:question_4'          0.035006    0.051624      0.6781    174





    pValue        Lower         Upper    

    2.2341e-17       0.24545      0.37498

      0.060341    -0.0030335      0.14106

        0.9415     -0.076515     0.071022

       0.11435      -0.12997      0.01412

       0.78001     -0.084224     0.063313

     0.0080627      -0.16989    -0.025794

       0.46827     -0.098582     0.045513

       0.28437      -0.15922     0.047011

       0.36563     -0.056458      0.15248

       0.22315     -0.039242      0.16699

       0.86607      -0.11061     0.093171

       0.74445     -0.086057      0.12017

      0.005729      0.042532      0.24631

       0.22767     -0.039391      0.16439

       0.87068     -0.094597      0.11163

       0.49861     -0.066884       0.1369



**Random effects covariance parameters (95% CIs):**

Group: id (12 Levels)

    Name1                Name2                Type         Estimate    Lower   

    '(Intercept)'        '(Intercept)'        'std'        0.070184    0.045165





    Upper  

    0.10906



Group: Error

    Name             Estimate    Lower       Upper   

    'Res Std'        0.089415    0.080594    0.099203





ans = 





    **ANOVA marginal tests: DFMethod = 'Residual'**



    Term                     FStat     DF1    DF2    pValue    

    '(Intercept)'            89.373    1      174    2.2341e-17

    'design'                 4.0557    3      174     0.0081227

    'question'               2.8981    3      174      0.036597

    'design:question'        2.7628    9      174     0.0047997





ans = 





    **Theoretical Likelihood Ratio Test**



    Model     DF    AIC        BIC        LogLik    LRStat    deltaDF    pValue    

    lme        6    -300.53    -281.05    156.27                                   

    lmeAlt    18     -313.8    -255.35     174.9    37.267    12         0.00020222





lme = 





**Linear mixed-effects model fit by ML**



**Model information:**

    Number of observations             190

    Fixed effects coefficients           4

    Random effects coefficients         12

    Covariance parameters                2



**Formula:**

    odr ~ 1 + design + (1 | id)



**Model fit statistics:**

    AIC        BIC        LogLikelihood    Deviance

    -264.12    -244.64    138.06           -276.12 



**Fixed effects coefficients (95% CIs):**

    Name                 Estimate     SE          tStat      DF     pValue    

    '(Intercept)'          0.36534    0.037923     9.6337    186    4.4902e-18

    'design_db'          -0.070088    0.021811    -3.2134    186     0.0015464

    'design_gb'            0.02164    0.021919    0.98731    186       0.32477

    'design_rb'            0.03936    0.021811     1.8045    186      0.072763





    Lower         Upper    

       0.29052      0.44015

      -0.11312    -0.027058

     -0.021601     0.064881

    -0.0036698     0.082389



**Random effects covariance parameters (95% CIs):**

Group: id (12 Levels)

    Name1                Name2                Type         Estimate    Lower   

    '(Intercept)'        '(Intercept)'        'std'        0.11988     0.078781





    Upper  

    0.18242



Group: Error

    Name             Estimate    Lower       Upper  

    'Res Std'        0.10625     0.095771    0.11789





ans = 



    ** ANOVA marginal tests: DFMethod = 'Residual' **



    Term                 FStat     DF1    DF2    pValue    

    '(Intercept)'        92.808    1      186    4.4902e-18

    'design'             9.7731    3      186    5.0982e-06





lmeAlt = 





** Linear mixed-effects model fit by ML**



Model information:

    Number of observations             190

    Fixed effects coefficients          16

    Random effects coefficients         12

    Covariance parameters                2



Formula:

    odr ~ 1 + design*question + (1 | id)



Model fit statistics:

    AIC        BIC        LogLikelihood    Deviance

    -272.09    -213.64    154.04           -308.09 



Fixed effects coefficients (95% CIs):

    Name                          Estimate     SE          tStat       DF 

    '(Intercept)'                   0.34255    0.044629      7.6755    174

    'design_db'                   -0.082398    0.039654     -2.0779    174

    'design_gb'                    0.018294    0.040606     0.45053    174

    'design_rb'                    0.086447    0.039654        2.18    174

    'question_2'                   0.022482    0.040606     0.55368    174

    'question_3'                    0.11939    0.039654      3.0108    174

    'question_4'                  -0.050819    0.039654     -1.2816    174

    'design_db:question_2'         0.056969    0.056757      1.0037    174

    'design_gb:question_2'        -0.013384     0.05751    -0.23272    174

    'design_rb:question_2'        -0.059854    0.056757     -1.0546    174

    'design_db:question_3'        -0.038434     0.05608    -0.68535    174

    'design_gb:question_3'        -0.086105    0.056757     -1.5171    174

    'design_rb:question_3'         -0.17161     0.05608     -3.0601    174

    'design_db:question_4'         0.030819     0.05608     0.54955    174

    'design_gb:question_4'          0.11072    0.056757      1.9508    174

    'design_rb:question_4'         0.043229     0.05608     0.77085    174





    pValue        Lower         Upper     

    1.1337e-12       0.25446       0.43063

      0.039187      -0.16066    -0.0041323

       0.65289     -0.061849      0.098438

        0.0306     0.0081813       0.16471

       0.58051     -0.057661       0.10263

     0.0029931      0.041127       0.19766

       0.20171      -0.12908      0.027446

        0.3169     -0.055051       0.16899

       0.81625      -0.12689       0.10012

       0.29309      -0.17187      0.052166

       0.49403      -0.14912       0.07225

       0.13106      -0.19813      0.025915

     0.0025629       -0.2823     -0.060928

       0.58333     -0.079866        0.1415

      0.052686    -0.0012986       0.22274

       0.44184     -0.067455       0.15391



**Random effects covariance parameters (95% CIs):**

Group: id (12 Levels)

    Name1                Name2                Type         Estimate    Lower   

    '(Intercept)'        '(Intercept)'        'std'        0.12027     0.079305





    Upper  

    0.18241



Group: Error

    Name             Estimate    Lower      Upper  

    'Res Std'        0.097133    0.08755    0.10777





ans = 





    ** ANOVA marginal tests: DFMethod = 'Residual'**



    Term                     FStat     DF1    DF2    pValue    

    '(Intercept)'            58.913    1      174    1.1337e-12

    'design'                 6.1295    3      174    0.00054976

    'question'               6.4738    3      174    0.00035275

    'design:question'        3.0252    9      174     0.0022065





ans = 





    **Theoretical Likelihood Ratio Test**



    Model     DF    AIC        BIC        LogLik    LRStat    deltaDF    pValue   

    lme        6    -264.12    -244.64    138.06                                  

    lmeAlt    18    -272.09    -213.64    154.04    31.97     12         0.0013985

