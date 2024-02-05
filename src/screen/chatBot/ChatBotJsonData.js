
export const ChatBotJsonData = [
    { text: 'Hey! I am Koala.. How Can i help you today?', user: false },
    {
        text: 'Please select any one of the options to proceed', user: false,
        data: [
            {
                level: 1,
                question: 'Attendance',
                answer: 'Attendance Policy',
                data: [
                    {
                        level: 2,
                        question: 'How is my daily attendance tracked?',
                        answer: 'Daily attendance is tracked based on the employee\'s scheduled shift.It is the responsibility of employees to ensure they complete at least 8 hours in a day as per their scheduled shift.Late arrivals or absences should be notified to the respective reporting manager.',
                    },
                    {
                        level: 2,
                        question: 'Are there consequences for excessive absenteeism?',
                        answer: 'Excessive absenteeism may lead to consequences such as deductions from leave balances or salary. Lately coming beyond the scheduled shift a certain number of times in a month can result in a deduction of half-day\'s PL/ salary.'
                    },
                    {
                        level: 2,
                        question: 'Can I make up for missed work hours?',
                        answer: 'The policy doesn\'t explicitly mention making up for missed work hours.It\'s advisable to discuss any need for makeup hours with the reporting manager.'
                    },
                    {
                        level: 2,
                        question: 'What if I forget to punch-in/ Punch-out?',
                        answer: 'Forgetting to punch-in/punch-out should be avoided. Forgetting to Punch-in or Punch-out should be immediately notified to the reporting manager, which can be regularized with the approval of the reporting manager.'
                    },
                    {
                        level: 2,
                        question: 'What is the procedure for attendance regularization?',
                        answer: 'You can regularize your attendance in the Enviro.H Web version'
                    },
                    {
                        level: 2,
                        question: 'What if I fail to regularize my attendance before month ends?',
                        answer: 'Failing to regularize attendance before the month-end may result in late attendance or absence. It\'s important to follow the company\'s procedures and inform the reporting manager promptly to avoid any consequences.'
                    },
                    {
                        level: 2,
                        question: 'What if I complete my shift hours but don’t come on time or leave early?',
                        answer: 'Completing shift hours is essential, but adherence to scheduled time is also crucial. Late coming or leaving early may be subject to the company\'s policies on attendance, and it\'s advisable to discuss such situations with the reporting manager.'
                    },
                ]
            },
            {
                level: 1,
                question: 'Timesheet',
                answer: 'Timesheet Policy.',
                data: [
                    {
                        level: 2,
                        question: 'How do I submit my timesheet?',
                        answer: 'Timesheets should be submitted through Enviro.H Platform. Ensure all hours worked are accurately recorded before submission. A minimum of 8 hours timesheet needs to be submitted.',
                    },
                    {
                        level: 2,
                        question: 'Why am I unable to fill my timesheet?',
                        answer: 'If you are not filling the timesheet on daily basis, then after 5 days you will not be able to Punch-In '
                    },
                    {
                        level: 2,
                        question: 'How do I make changes to my submitted timesheet?',
                        answer: 'Corrections to timesheets after approval may be allowed in exceptional cases. However, any changes should be communicated to and approved by your supervisor and HR.'
                    },
                    {
                        level: 2,
                        question: 'What if I forget to submit my timesheet on time?',
                        answer: 'If you miss the deadline, submit your timesheet as soon as possible. However, after 5 days you will not be able to Punch-In '
                    },
                    {
                        level: 2,
                        question: 'How do I account for overtime/additional hours worked on my timesheet?',
                        answer: 'If you work overtime or extra hours, make sure to record them accurately on your timesheet.'
                    },
                ]
            },
            {
                level: 1,
                question: 'Leave',
                answer: 'Leave Policy.',
                data: [
                    {
                        level: 2,
                        question: 'What is the process for leave application?',
                        answer: '1.To submit leave requests, follow the following steps.Enviro.H > Homepage > Open “Leave Report” > Click on “Leave Request” in the top left corner. \n2.Leave requests should be submitted through Enviro.H portal. Ensure requests are submitted for upcoming days and data filled properly. ',
                    },
                    {
                        level: 2,
                        question: 'Is there a maximum limit to the number of days I can take off?',
                        answer: 'The provided leave policy information does not explicitly mention the maximum limit to the number of days that an employee can take leave in a continuous duration',
                    },
                    {
                        level: 2,
                        question: 'How is leave balance calculated?',
                        answer: 'The leave balance is calculated based on the type of leave and the company\'s policy.Earned leaves are typically accrued at a rate of 1.5 days per month.Casual and sick leaves may have different accrual methods.The balance is adjusted for leaves taken and lapses at the end of the financial year.',
                    },
                    {
                        level: 2,
                        question: 'What if I need to extend my leave?',
                        answer: '1.If you need to extend your leave or return earlier than initially planned, notify your supervisor and HR as soon as possible. Extensions are subject to approval. \n2.If you need to extend your leave, you should inform your reporting manager and HR as soon as possible. Submit a formal extension request, specifying the additional duration and the reason for the extension. Approval will be subject to the company\'s policies and business needs.',
                    },
                    {
                        level: 2,
                        question: 'How do I cancel my application and approved leave?',
                        answer: 'You can cancel your leave application in Enviro.H platform from the Leave section by clicking on approved/unapproved application.',
                    },
                    {
                        level: 2,
                        question: 'What types of leave are available, and how are they different?',
                        answer: 'As per policy, every confirmed employee is entitled to 18 days of earned leave, 7 days of casual leave, and 7 days of sick leave in the financial year. (Depends on location)\n    The company offers three types of leave:\n        Earned Leave (EL): Accrued monthly for planned vacations, illness, family reasons, or emergencies.\n        Casual Leave (CL): Seven days per financial year for unplanned or short-duration absences.\n        Sick Leave (SL): varies by location for health-related reasons.',
                    },
                    {
                        level: 2,
                        question: 'Can I accumulate unused leave for the next year?',
                        answer: '1.According to the policy, 5 days of earned leave will be carried forward into the next financial year.\n2.You can carry forward a maximum of 5 earned leaves to the next financial year. However, all casual and sick leaves lapse at the end of the financial year.',
                    },
                ]
            },
            {
                level: 1,
                question: 'Maternity Leave',
                answer: 'Maternity Leave.',
                data: [
                    {
                        level: 2,
                        question: 'How do I request maternity leave?',
                        answer: 'To request maternity leave, inform your reporting manager at least 6 weeks prior to proceeding on leave. Submit a formal leave application along with a medical practitioner\'s certificate, specifying the expected date of delivery and the intended duration of leave.',
                    },
                    {
                        level: 2,
                        question: 'When can I start my maternity leave?',
                        answer: 'Maternity leave can start not more than 8 weeks before the expected date of delivery. It\'s advisable to plan the start date in consultation with your reporting manager and HR to ensure a smooth transition.',
                    },
                    {
                        level: 2,
                        question: 'How long is the maternity leave duration?',
                        answer: 'Female employees can avail of maternity leave of up to 26 weeks for each of their first 2 surviving children. For 2 or more surviving children, the entitlement is 12 weeks per child beyond the first 2 surviving children. Additional leave is also available in specific circumstances mentioned in the policy.',
                    },
                    {
                        level: 2,
                        question: 'Is maternity leave paid or unpaid?',
                        answer: 'Maternity leave is typically paid as per the provisions of the Maternity Benefit Act. The policy does not specify whether the leave is fully paid or if there are any deductions. It\'s advisable to check with the HR department for details on salary during maternity leave.',
                    },
                    {
                        level: 2,
                        question: 'Can I take additional leave beyond the specified duration?',
                        answer: '1.Leaves taken beyond the statutory limit will be charged to annual leaves. If you require additional leave beyond the specified maternity leave duration, it would be subject to the company\'s leave policies and may be treated as annual leave.\nIn certain situations, additional leave beyond the specified duration may be possible. Please discuss any extended leave requests with your supervisor and HR for approval.',
                    },
                    {
                        level: 2,
                        question: 'Can I use accrued vacation or sick leave during maternity leave?',
                        answer: 'The policy does not explicitly mention the use of accrued vacation or sick leave during maternity leave. It\'s advisable to check with the HR department to understand whether other accrued leaves can be used in conjunction with maternity leave.',
                    },
                    {
                        level: 2,
                        question: 'Can I work part-time during my maternity leave?',
                        answer: 'The company may allow the employee to work from home during the maternity leave period, subject to mutual agreement.',
                    },
                    {
                        level: 2,
                        question: 'How do I stay informed about workplace updates during maternity leave?',
                        answer: 'While on maternity leave, you can stay informed about workplace updates through regular communication channels. It\'s advisable to coordinate with your reporting manager or HR to receive updates through emails, newsletters, or any other communication tools used by the company.',
                    },
                ]
            },
            {
                level: 1,
                question: 'Maternity WFH',
                answer: 'Maternity WFH.',
                data: [
                    {
                        level: 2,
                        question: 'Can I work from home during my maternity leave?',
                        answer: 'Yes, if the nature of your work allows, the company may allow you to work from home during your maternity leave. This is subject to mutual agreement between you and the firm.',
                    },
                    {
                        level: 2,
                        question: 'How do I request to work from home during my maternity leave?',
                        answer: 'To request to work from home during your maternity leave, you should discuss this with your reporting manager. It\'s advisable to initiate the conversation well in advance, expressing your interest and discussing the feasibility of remote work during the maternity leave period.',
                    },
                    {
                        level: 2,
                        question: 'Are there specific criteria for being eligible to work from home during maternity leave?',
                        answer: 'The policy doesn\'t explicitly mention specific criteria for eligibility to work from home during maternity leave.The decision is likely based on the nature of your role and the feasibility of remote work.Discuss with your reporting manager and HR for more details.',
                    },
                    {
                        level: 2,
                        question: 'How does working from home during maternity leave affect my leave duration?',
                        answer: 'The policy doesn\'t provide specific details on how working from home during maternity leave affects the leave duration.It\'s advisable to discuss this aspect with your reporting manager and HR during the agreement on working from home.',
                    },
                    {
                        level: 2,
                        question: 'Can I start working from home before the official start of my maternity leave?',
                        answer: 'The policy doesn\'t explicitly mention starting to work from home before the official start of maternity leave.However, this is something you can discuss with your reporting manager and HR to explore possibilities based on your specific situation.',
                    },
                    {
                        level: 2,
                        question: 'How is my performance measured while working from home during maternity leave?',
                        answer: 'The policy doesn\'t provide specific details on performance measurement while working from home during maternity leave.It\'s advisable to clarify expectations with your reporting manager and HR, including any performance metrics or deliverables during this period.',
                    },
                ]
            },
            {
                level: 1,
                question: 'WFH',
                answer: 'WFH Policy.',
                data: [
                    {
                        level: 2,
                        question: ' How do I request to work from home?',
                        answer: 'Requests to work from home should be submitted through the One. H portal. Ensure requests are made at least one week in advance.',
                    },
                    {
                        level: 2,
                        question: 'How often can I work from home?',
                        answer: 'The frequency of remote work depends on your role, team, and the nature of your work. Contact your reporting manager for details on the frequency of work-from-home arrangements.',
                    },
                    {
                        level: 2,
                        question: 'Do I need to set specific working hours when working from home?',
                        answer: 'Yes, when working from home, you are expected to adhere to your regular working hours unless otherwise agreed upon with your supervisor. Maintain open communication regarding your schedule.',
                    },
                    {
                        level: 2,
                        question: 'How is performance measured while working from home?',
                        answer: 'Performance expectations remain the same whether you are in the office or working from home. Regular check-ins, meetings, and deliverables are key indicators of performance.',
                    },
                    {
                        level: 2,
                        question: 'Can I work from a location outside of my primary residence?',
                        answer: 'Remote work is generally expected to be conducted from your primary residence. Any exceptions must be discussed and approved by your supervisor and HR in advance.',
                    },
                    {
                        level: 2,
                        question: 'How do I stay connected with my team while working remotely?',
                        answer: 'Communication tools, such as [video conferencing, messaging apps], should be used to stay connected. Regular team meetings and check-ins are encouraged. You should have a good internet connection at home.',
                    },
                    {
                        level: 2,
                        question: 'Can I use company equipment for remote work?',
                        answer: 'Yes, you may be provided with company equipment for remote work.',
                    },
                ]
            }
        ]
    },
];