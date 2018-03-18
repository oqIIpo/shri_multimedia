const videoTagId = "video";
const texCanvasId = "texCanvas";
const displayCanvasId = "webglCanvas";

const runningText = `1  STARTMESSAGE: DB 'SYSTEM INFORMATION:' NEWLINE: DB 13, 0
2  CPUSTRINGMSG: DB 'CPU STRING: ', 0
3  NUMCORESMSG: DB 13, 'NUMBER OF CORES: ', 0
4  SPEEDMSG: DB 13, 'DETECTED SPEED: ', 0
5  L1CCACHEMSG: DB 13, 'L1 CODE CACHE: ', 0
6  L1DCACHEMSG: DB 13, 'L1 DATA CACHE: ', 0
7  L2UCACHEMSG: DB 13, 'L2 UNIFIED CACHE: ', 0
8  L3UCACHEMSG: DB 13, 'L3 UNIFIED CACHE: ', 0
9  CPUFEATURES: DB 13, 'CPU FEATURES: ', 0
10  KBMSG: DB ' KIB', 0
11  MBMSG: DB ' MIB', 0
12  MHZMSG: DB ' MHZ', 0
13  SSE: DB 'SSE ', 0
14  SSE2: DB 'SSE2 ', 0
15  SSE3: DB 'SSE3 ', 0
16  SSSE3: DB 'SSSE3 ', 0
17  SSE41: DB 'SSE4.1 ', 0
18  SSE42: DB 'SSE4.2 ', 0
19  AES: DB 'AES ', 0
20  AVX: DB 'AVX ', 0
21  MEMMESSAGE: DB 13, 'RAM: ', 0
22  .CODE 16
23  .THUMB:
24  LDR %R3, .STRING0
25  LDR %R4, .STRING1
26  LDR %R5, .STRING2
27  MVN %R5, %R5
28  PUSH {%R3, %R4, %R5}
29  MOV %R0, %SP
30  LDR %R3, .STRING3
31  PUSH {%R3}
32  SUB %R2, %R2, %R2
33  PUSH {%R0, %R1, %R2}
34  MOV %R1, %SP
35  MOV %R1, %SP
36  MOV %R7, $11
37  SWI #1
38  0,386
39  .MODEL FLAT, STDCALL
40  .STACK 4096
41  EXITPROCESS PROTO, DWEXITCODE:DWORD
42  .DATA
43  WAGES DWORD 46000
44  TAXES DWORD ?
45  .CODE
46  _MAIN PROC
47  MOV EAX, 50000
48  CMP WAGES, EAX
49  JAE HIGHER
50  MOV TAXES, 2000
51  JMP DONE
52  HIGHER:
53  MOV TAXES, 4000
54  DONE:
55  INVOKE EXITPROCESS, 0
56  _MAIN ENDP
57  END
58  SECTION .DATA
59  WAGES: DD 46000
60  SECTION .BSS
61  TAXES: RESD 1
62  SECTION .TEXT
63  GLOBAL _MAIN
64  _MAIN:
65  MOV EAX, 50000
66  CMP DWORD [WAGES], EAX
67  JAE HIGHER
68  MOV DWORD [TAXES], 2000
69  JMP DONE
70  HIGHER:
71  MOV DWORD [TAXES], 4000
72  DONE:
73  MOV EAX, 1
74  MOV EBX, 0
75  INT 80H
76  XOR RAX, RAX
77  MOV RDI, TSTRING
78  MOV EAX, 0X80000002
79  CPUID
80  STOSD
81  MOV EAX, EBX
82  STOSD
83  MOV EAX, ECX
84  STOSD
85  MOV EAX, EDX
86  STOSD
87  MOV EAX, 0X80000003
88  CPUID
89  STOSD
90  MOV EAX, EBX
91  STOSD
92  MOV EAX, ECX
93  STOSD
94  MOV EAX, EDX
95  STOSD
96  MOV EAX, 0X80000004
97  CPUID
98  STOSD
99  MOV EAX, EBX
100  STOSD
101  MOV EAX, ECX
102  STOSD
103  MOV EAX, EDX
104  STOSD
105  XOR AL, AL
106  STOSBMOV RSI, CPUSTRINGMSG
107  CALL [B_OUTPUT]
108  MOV RSI, TSTRING
109  CHECK_FOR_SPACE:CMP BYTE [RSI], ' '
110  JNE PRINT_CPU_STRING
111  ADD RSI, 1
112  JMP CHECK_FOR_SPACE
113  PRINT_CPU_STRING:
114  CALL [B_OUTPUT]
115  MOV RSI, NUMCORESMSG
116  CALL [B_OUTPUT]
117  XOR RAX, RAX
118  MOV RSI, 0X5012
119  LODSW
120  MOV RDI, TSTRING
121  CALL INT_TO_STRING
122  MOV RSI, TSTRING
123  CALL [B_OUTPUT]
124  MOV RSI, SPEEDMSG
125  CALL [B_OUTPUT]
126  XOR RAX, RAX
127  MOV RSI, 0X5010
128  LODSW
129  MOV RDI, TSTRING
130  CALL INT_TO_STRING
131  MOV RSI, TSTRING
132  CALL [B_OUTPUT]
133  MOV RSI, MHZMSG
134  CALL [B_OUTPUT]
135  MOV EAX, 0X80000005CPUID
136  MOV EAX, EDXSHR EAX, 24
137  MOV RDI, TSTRING
138  CALL INT_TO_STRING
139  MOV RSI, L1CCACHEMSG
140  CALL [B_OUTPUT]
141  MOV RSI, TSTRING
142  CALL [B_OUTPUT]
143  MOV RSI, KBMSG
144  CALL [B_OUTPUT]
145  MOV EAX, ECXSHR EAX, 24
146  MOV RDI, TSTRING
147  CALL INT_TO_STRING
148  MOV RSI, L1DCACHEMSG
149  CALL [B_OUTPUT]
150  MOV RSI, TSTRING
151  CALL [B_OUTPUT]
152  MOV RSI, KBMSG
153  CALL [B_OUTPUT]
154  MOV EAX, 0X80000006CPUID
155  MOV EAX, ECXSHR EAX, 16
156  MOV RDI, TSTRING
157  CALL INT_TO_STRING
158  MOV RSI, L2UCACHEMSG
159  CALL [B_OUTPUT]
160  MOV RSI, TSTRING
161  CALL [B_OUTPUT]
162  MOV RSI, KBMSG
163  CALL [B_OUTPUT]
164  MOV EAX, EDXSHR EAX, 18
165  AND EAX, 0X3FFFFSHL EAX, 9MOV RDI, TSTRING
166  CALL INT_TO_STRING
167  MOV RSI, L3UCACHEMSG
168  CALL [B_OUTPUT]
169  MOV RSI, TSTRING
170  CALL [B_OUTPUT]
171  MOV RSI, KBMSG
172  CALL [B_OUTPUT]
173  MOV RSI, CPUFEATURES
174  CALL [B_OUTPUT]
175  MOV RAX, 1
176  CPUID
177  CHECKSSE:
178  TEST EDX, 00000010000000000000000000000000B
179  JZ CHECKSSE2
180  MOV RSI, SSE
181  CALL [B_OUTPUT]
182  CHECKSSE2:
183  TEST EDX, 00000100000000000000000000000000B
184  JZ CHECKSSE3
185  MOV RSI, SSE2
186  CALL [B_OUTPUT]
187  CHECKSSE3:
188  TEST ECX, 00000000000000000000000000000001B
189  JZ CHECKSSSE3
190  MOV RSI, SSE3
191  CALL [B_OUTPUT]
192  CHECKSSSE3:
193  TEST ECX, 00000000000000000000001000000000B
194  JZ CHECKSSE41
195  MOV RSI, SSSE3
196  CALL [B_OUTPUT]
197  CHECKSSE41:
198  TEST ECX, 00000000000010000000000000000000B
199  JZ CHECKSSE42
200  MOV RSI, SSE41
201  CALL [B_OUTPUT]
202  CHECKSSE42:
203  TEST ECX, 00000000000100000000000000000000B
204  JZ CHECKAES
205  MOV RSI, SSE42
206  CALL [B_OUTPUT]
207  CHECKAES:
208  TEST ECX, 00000010000000000000000000000000B
209  JZ CHECKAVX
210  MOV RSI, AES
211  CALL [B_OUTPUT]
212  CHECKAVX:
213  TEST ECX, 00010000000000000000000000000000B
214  JZ ENDIT
215  MOV RSI, AVX
216  CALL [B_OUTPUT]
217  ENDIT:
218  MOV RSI, MEMMESSAGE
219  CALL [B_OUTPUT]
220  XOR RAX, RAX
221  MOV RSI, 0X5020
222  LODSW
223  MOV RDI, TSTRING
224  CALL INT_TO_STRING
225  MOV RSI, TSTRING
226  CALL [B_OUTPUT]
227  MOV RSI, MBMSG
228  CALL [B_OUTPUT]
229  MOV RSI, NEWLINE
230  CALL [B_OUTPUT]
231  RET
232  INT_TO_STRING:
233  PUSH RDX
234  PUSH RCX
235  PUSH RBX
236  PUSH RAX
237  POP RAX
238  POP RBX
239  POP RCX
240  POP RDX
241  RET
242  STARTMESSAGE: DB 'SYSTEM INFORMATION:' NEWLINE: DB 13, 0
243  CPUSTRINGMSG: DB 'CPU STRING: ', 0
244  NUMCORESMSG: DB 13, 'NUMBER OF CORES: ', 0
245  SPEEDMSG: DB 13, 'DETECTED SPEED: ', 0
246  L1CCACHEMSG: DB 13, 'L1 CODE CACHE: ', 0
247  L1DCACHEMSG: DB 13, 'L1 DATA CACHE: ', 0
248  L2UCACHEMSG: DB 13, 'L2 UNIFIED CACHE: ', 0
249  L3UCACHEMSG: DB 13, 'L3 UNIFIED CACHE: ', 0
250  CPUFEATURES: DB 13, 'CPU FEATURES: ', 0
251  KBMSG: DB ' KIB', 0
252  MBMSG: DB ' MIB', 0
253  MHZMSG: DB ' MHZ', 0
254  SSE: DB 'SSE ', 0
255  SSE2: DB 'SSE2 ', 0
256  SSE3: DB 'SSE3 ', 0
257  SSSE3: DB 'SSSE3 ', 0
258  SSE41: DB 'SSE4.1 ', 0
259  SSE42: DB 'SSE4.2 ', 0
260  AES: DB 'AES ', 0
261  AVX: DB 'AVX ', 0
262  MEMMESSAGE: DB 13, 'RAM: ', 0
263  TSTRING: TIMES 50 DB `;
