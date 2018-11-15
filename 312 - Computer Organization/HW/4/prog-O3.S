	.file	"prog.c"
	.text
	.p2align 4,,15
	.globl	bubble_sort
	.type	bubble_sort, @function
bubble_sort:
.LFB20:
	.cfi_startproc
	addq	$1, insn_count(%rip)
	testl	%esi, %esi
	jle	.L1
	leal	-2(%rsi), %eax
	cmpl	$1, %esi
	leaq	4(%rdi,%rax,4), %r8
	jne	.L17
.L1:
	rep ret
.L17:
	xorl	%r10d, %r10d
	.p2align 4,,10
	.p2align 3
.L4:
	movq	%rdi, %rax
	xorl	%r9d, %r9d
	.p2align 4,,10
	.p2align 3
.L8:
	movl	(%rax), %ecx
	movl	4(%rax), %edx
	cmpl	%edx, %ecx
	jle	.L5
	movl	%ecx, 4(%rax)
	movl	%edx, (%rax)
	movl	$1, %r9d
.L5:
	addq	$4, %rax
	cmpq	%r8, %rax
	jne	.L8
	testl	%r9d, %r9d
	je	.L1
	addl	$1, %r10d
	cmpl	%esi, %r10d
	jne	.L4
	rep ret
	.cfi_endproc
.LFE20:
	.size	bubble_sort, .-bubble_sort
	.p2align 4,,15
	.globl	check_sorted
	.type	check_sorted, @function
check_sorted:
.LFB21:
	.cfi_startproc
	addq	$1, insn_count(%rip)
	cmpl	$1, %esi
	jle	.L22
	movl	4(%rdi), %eax
	cmpl	%eax, (%rdi)
	jg	.L24
	leal	-2(%rsi), %eax
	addq	$4, %rdi
	leaq	(%rdi,%rax,4), %rdx
	jmp	.L20
	.p2align 4,,10
	.p2align 3
.L21:
	movl	(%rdi), %eax
	addq	$4, %rdi
	cmpl	(%rdi), %eax
	jg	.L24
.L20:
	cmpq	%rdx, %rdi
	jne	.L21
.L22:
	movl	$1, %eax
	ret
	.p2align 4,,10
	.p2align 3
.L24:
	xorl	%eax, %eax
	ret
	.cfi_endproc
.LFE21:
	.size	check_sorted, .-check_sorted
	.section	.rodata.str1.8,"aMS",@progbits,1
	.align 8
.LC0:
	.string	"%lld instructions are executed\n"
	.section	.rodata.str1.1,"aMS",@progbits,1
.LC1:
	.string	"numbers are sorted"
.LC2:
	.string	"numbers are not sorted"
	.section	.text.startup,"ax",@progbits
	.p2align 4,,15
	.globl	main
	.type	main, @function
main:
.LFB22:
	.cfi_startproc
	addq	$1, insn_count(%rip)
	pushq	%rbx
	.cfi_def_cfa_offset 16
	.cfi_offset 3, -16
	movl	$numbers, %ebx
	.p2align 4,,10
	.p2align 3
.L27:
	call	rand
	addq	$4, %rbx
	movl	%eax, -4(%rbx)
	cmpq	$numbers+40000, %rbx
	jne	.L27
	movl	$10000, %esi
	movl	$numbers, %edi
	call	bubble_sort
	addq	$1, insn_count(%rip)
	movl	$numbers+4, %eax
	movl	numbers(%rip), %ecx
	jmp	.L30
	.p2align 4,,10
	.p2align 3
.L33:
	addq	$4, %rax
	cmpq	$numbers+40000, %rax
	je	.L29
	movl	%edx, %ecx
.L30:
	movl	(%rax), %edx
	cmpl	%ecx, %edx
	jge	.L33
	movl	$.LC2, %edi
	call	puts
.L31:
	movq	insn_count(%rip), %rsi
	movl	$.LC0, %edi
	xorl	%eax, %eax
	call	printf
	xorl	%edi, %edi
	call	exit
.L29:
	movl	$.LC1, %edi
	call	puts
	jmp	.L31
	.cfi_endproc
.LFE22:
	.size	main, .-main
	.comm	numbers,40000,32
	.globl	insn_count
	.bss
	.align 16
	.type	insn_count, @object
	.size	insn_count, 8
insn_count:
	.zero	8
	.ident	"GCC: (GNU) 4.8.5 20150623 (Red Hat 4.8.5-11)"
	.section	.note.GNU-stack,"",@progbits
