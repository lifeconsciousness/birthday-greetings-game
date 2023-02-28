OPTION DOTNAME
	
option casemap:none
include temphls.inc
include win64.inc
include kernel32.inc
includelib kernel32.lib
include user32.inc
includelib user32.lib
OPTION PROLOGUE:rbpFramePrologue
OPTION EPILOGUE:none

; Yn = 150/(x^2 - 7)

.const
    title0 db "Lab_3_2 Task_1", 0
    fmt0 db "Y = 150 / (X^2 - 7); X0 = 2; STEP = 3.1", 10,
            "Y0 = %s", 10,
            "Y1 = %s", 10,
            "Y2 = %s", 10,
            "Y3 = %s", 10, 10,
            "Author: Kostin A.S. CIT-120b", 0
    const0 dq 7.0
    const1 dq 150.0
    step0 dq 3.1
    loop_count0 dq 4
.data
    x0 dq 2.0
    res0 dq 4 dup(0.0) ; Array of results
    text0 db 256 dup(0)

    sres0 db 32 dup(0)
    sres1 db 32 dup(0)
    sres2 db 32 dup(0)
    sres3 db 32 dup(0)
.code
entry_point proc
    lea rdi, res0 ; Address of the array
    mov rcx, loop_count0 ; Number of function iterations
    finit
m0:
    fld const1
    fld x0
    fmul st(0), st(0); X^2
    fld const0
    fsubp st(1), st(0) ; (X^2 + 7)
    fdivp st(1), st(0) ; 150 / (X^2 + 7)

    fstp qword ptr [rdi] ; st0 -> array[i]
    add rdi, type res0 ; i += element size

    fld x0
    fld step0
    faddp st(1), st(0)
    fstp qword ptr [x0]

    loop m0 ; While loop_count != 0

    invoke fptoa, qword ptr[res0], addr sres0
    invoke fptoa, qword ptr[res0 + 8h], addr sres1
    invoke fptoa, qword ptr[res0 + 10h], addr sres2
    invoke fptoa, qword ptr[res0 + 18h], addr sres3
    invoke wsprintf, addr text0, addr fmt0, addr sres0, addr sres1, addr sres2, addr sres3
    invoke MessageBox, 0, addr text0, addr title0, MB_OK
    invoke ExitProcess, 0
entry_point endp
end
